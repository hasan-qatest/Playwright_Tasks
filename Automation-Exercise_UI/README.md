# Login Test Runner — Web UI for the Playwright Automation Project

This adds a browser-based UI on top of the existing Playwright + Page Object
Model login automation project. You enter an email, click Submit, and the
existing `AutomationExercise.spec.ts` test runs against
`automationexercise.com` using that email. The page then shows the result
(pass/fail, execution time, error message) and plays back the video
Playwright recorded for that run.

## What changed vs. the original project

| File | Change |
|---|---|
| `pages/HomePage.ts`, `pages/LoginPage.ts`, `pages/Logout.ts` | **Untouched.** No Page Object Model changes were needed. |
| `testData/TestData.csv` | **Untouched.** Still the source of truth for passwords and the default data-driven loop. |
| `utils/constants.ts`, `utils/logger.ts` | **Untouched.** |
| `tests/AutomationExercise.spec.ts` | **Small, additive change.** Reads an optional `UI_EMAIL` environment variable. If it's set (the UI sets it), the test runs once with that email + the password from the first CSV row. If it's not set, the test behaves exactly as before and loops over every row in the CSV. |
| `playwright.config.ts` | **Small, additive change.** Added a `json` reporter (alongside the existing `html` one) so the backend can read pass/fail/duration/errors programmatically. |
| `package.json` | Added `express` as a dependency and a `start` script. |
| `server/` | **New.** Express backend that runs the test and serves results. |
| `html/` | **New.** The frontend: `index.html`, `styles.css`, `app.js`. |

## Folder structure

```
Task_4_CSV/
├── html/                     # Frontend (new)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server/                   # Backend (new)
│   └── server.js
├── pages/                    # Page Object Model (unchanged)
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── Logout.ts
├── testData/
│   └── TestData.csv          # unchanged — still supplies passwords
├── tests/
│   └── AutomationExercise.spec.ts   # small additive change, see above
├── utils/
│   ├── constants.ts           # unchanged
│   └── logger.ts              # unchanged
├── playwright.config.ts       # additive change: JSON reporter added
├── package.json                # express + start script added
└── README.md
```

`test-results/` and `playwright-report/` are generated automatically the
first time you run a test (via the UI or `npm test`) and are already in
`.gitignore`.

## How it works, end to end

1. You open the page served at `http://localhost:3000` (the Express server
   serves the `html/` folder as static files).
2. You type an email and click **Submit**.
3. The frontend (`html/app.js`) sends `POST /api/run-test` with `{ email }`.
4. The backend (`server/server.js`) runs:
   ```
   npx playwright test --project=chromium
   ```
   as a child process, with the environment variable `UI_EMAIL` set to the
   email you typed. The password still comes from `testData/TestData.csv`,
   exactly as the requirements specify.
5. The test runs through the **same Page Object Model classes** as before
   (`HomePage`, `LoginPage`, `Logout`) — nothing about how the test drives
   the browser has changed.
6. When the process exits, the backend reads `test-results/results.json`
   (the JSON reporter's output) to get the pass/fail status, duration, and
   any error message, and finds the `.webm` video Playwright recorded for
   that run.
7. The backend responds with `{ status, durationMs, errorMessage, videoUrl }`.
8. The frontend renders the result and loads the video into the `<video>`
   player.

## Prerequisites

- Node.js 18+ and npm
- Internet access to `automationexercise.com` (the site under test) from
  wherever you run this

## Setup

From the project root (`Task_4_CSV/`):

```bash
# 1. Install dependencies (includes Playwright, Express, csv-parse, etc.)
npm install

# 2. Install the Playwright browser binaries (one-time setup)
npx playwright install chromium
```

## Running the app

```bash
# Start the Express server (serves the UI and runs tests on demand)
npm start
```

Then open your browser to:

```
http://localhost:3000
```

Enter an email and click **Submit**. The first run may take a few seconds
while the browser launches and the login flow plays out.

### Running the original test suite directly (unchanged)

You can still run the full CSV-driven suite from the command line exactly
as before, without the UI:

```bash
npm test
```

This runs with `UI_EMAIL` unset, so it loops over every row in
`testData/TestData.csv`, same as the original project.

## Configuration notes

- **Port**: the server listens on port `3000` by default. Override with
  `PORT=4000 npm start`.
- **Headless mode**: `playwright.config.ts` already runs `headless: true`,
  unchanged from the original project — this keeps the server-triggered
  runs working on machines without a display.
- **Video recording**: `playwright.config.ts` already had `video: "on"`,
  unchanged — this is what makes a recording available after every run for
  the UI to play back.

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| "Playwright did not produce a results.json report" | Run `npx playwright install chromium` to install the browser binary. |
| Video card never appears | Check the server console output — if the test failed before the browser launched (e.g. missing browser binary), no video is recorded for that run. |
| `EADDRINUSE` on startup | Another process is already using port 3000. Run with `PORT=4000 npm start` or stop the other process. |
| Test always fails immediately on a fresh machine | Most commonly missing browser binaries — run `npx playwright install chromium`. |

## Security note

The video-serving route (`GET /videos/:relativePath`) resolves the
requested path against the project's `test-results/` directory and
rejects any path that would resolve outside it, to prevent directory
traversal.
