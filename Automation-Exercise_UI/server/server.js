/**
 * server.js
 * -----------------------------------------------------------------------
 * Express backend that bridges the web UI (in /html) with the existing
 * Playwright + Page Object Model automation project.
 *
 * Responsibilities:
 *   1. Serve the static frontend (HTML/CSS/JS) from /html.
 *   2. POST /api/run-test
 *        - Accepts { email } from the UI.
 *        - Runs the existing Playwright test (tests/AutomationExercise.spec.ts)
 *          via the Playwright CLI, passing the email through the
 *          UI_EMAIL environment variable (see tests/AutomationExercise.spec.ts
 *          for how it's consumed). Password still comes from testData/TestData.csv.
 *        - Reads the JSON reporter output (test-results/results.json) to
 *          determine pass/fail, duration, and any error message.
 *        - Locates the .webm video recording Playwright generated for the
 *          run and exposes it at a stable URL the frontend can play.
 *   3. GET /videos/:filename — streams a recorded video file.
 *
 * No Page Object Model files (HomePage.ts, LoginPage.ts, Logout.ts) are
 * touched by this server. It only orchestrates the existing `npx playwright
 * test` CLI command, the same way a human running tests from a terminal would.
 * -----------------------------------------------------------------------
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Root of the Playwright project (one level up from /server).
const PROJECT_ROOT = path.resolve(__dirname, '..');
const RESULTS_JSON_PATH = path.join(PROJECT_ROOT, 'test-results', 'results.json');
const TEST_RESULTS_DIR = path.join(PROJECT_ROOT, 'test-results');

// Parse JSON request bodies (for POST /api/run-test).
app.use(express.json());

// Serve the frontend (index.html, styles.css, app.js) as static files.
app.use(express.static(path.join(PROJECT_ROOT, 'html')));

/**
 * Very small, deliberately permissive email format check.
 * The Playwright test itself is what actually validates login behavior
 * against the site (correct vs incorrect credentials) — this is only a
 * guard against obviously empty/malformed submissions from the UI.
 */
function isPlausibleEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Recursively walks the Playwright JSON report and flattens it into a
 * single list of { title, status, duration, error } test results.
 * The report can nest suites inside suites, so we walk depth-first.
 */
function flattenSpecs(suites = []) {
  const flat = [];
  for (const suite of suites) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const lastResult = test.results?.[test.results.length - 1];
        flat.push({
          title: spec.title,
          status: test.status, // 'expected' | 'unexpected' | 'flaky' | 'skipped'
          duration: lastResult?.duration ?? 0,
          error: lastResult?.error?.message || lastResult?.errors?.[0]?.message || null,
          attachments: lastResult?.attachments || [],
        });
      }
    }
    if (suite.suites?.length) {
      flat.push(...flattenSpecs(suite.suites));
    }
  }
  return flat;
}

/**
 * Finds the most recently modified .webm file under test-results/.
 * Playwright nests videos inside per-test folders, so we search recursively.
 * Used as a fallback when the JSON report's attachments don't include a
 * resolvable video path (e.g. older Playwright versions/config variations).
 */
function findLatestVideo(dir) {
  let latest = null;

  function walk(current) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.webm')) {
        const stat = fs.statSync(fullPath);
        if (!latest || stat.mtimeMs > latest.mtimeMs) {
          latest = { path: fullPath, mtimeMs: stat.mtimeMs };
        }
      }
    }
  }

  walk(dir);
  return latest?.path || null;
}

/**
 * Runs `npx playwright test` as a child process with UI_EMAIL set, and
 * resolves once the process exits (regardless of pass/fail — a failing
 * test is a normal, expected outcome we still need to report on).
 */
function runPlaywrightTest(email) {
  return new Promise((resolve) => {
    const env = {
      ...process.env,
      UI_EMAIL: email,
      // Keep CI-style behavior off so local dev defaults (workers, retries) apply.
    };

    const child = spawn(
      'npx',
      ['playwright', 'test', '--project=chromium'],
      {
        cwd: PROJECT_ROOT,
        env,
        shell: true, // needed for npx to resolve correctly on all platforms
      }
    );

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

    child.on('close', (code) => {
      resolve({ exitCode: code, stdout, stderr });
    });

    child.on('error', (err) => {
      // Covers the case where `npx`/`playwright` itself can't be launched.
      resolve({ exitCode: 1, stdout, stderr: stderr + '\n' + err.message });
    });
  });
}

/**
 * POST /api/run-test
 * Body: { email: string }
 * Response: {
 *   status: 'passed' | 'failed',
 *   durationMs: number,
 *   errorMessage: string | null,
 *   videoUrl: string | null   // e.g. "/videos/<encoded-path>"
 * }
 */
app.post('/api/run-test', async (req, res) => {
  const { email } = req.body || {};

  if (!isPlausibleEmail(email)) {
    return res.status(400).json({
      status: 'failed',
      durationMs: 0,
      errorMessage: 'Please enter a valid email address before submitting.',
      videoUrl: null,
    });
  }

  const startedAt = Date.now();

  try {
    // 1. Run the existing Playwright suite with the UI-supplied email.
    const { stderr } = await runPlaywrightTest(email.trim());

    // 2. Read the JSON report Playwright just wrote out.
    let report = null;
    if (fs.existsSync(RESULTS_JSON_PATH)) {
      report = JSON.parse(fs.readFileSync(RESULTS_JSON_PATH, 'utf-8'));
    }

    const fallbackDuration = Date.now() - startedAt;

    if (!report) {
      // Playwright never produced a report at all — something went wrong
      // before/outside the test run itself (e.g. browsers not installed).
      return res.status(500).json({
        status: 'failed',
        durationMs: fallbackDuration,
        errorMessage:
          stderr?.trim() ||
          'Playwright did not produce a results.json report. Check that browsers are installed (npx playwright install).',
        videoUrl: null,
      });
    }

    const results = flattenSpecs(report.suites);
    const overallStatus = results.some((r) => r.status === 'unexpected') ? 'failed' : 'passed';
    const totalDuration = report.stats?.duration ?? fallbackDuration;
    const firstError = results.find((r) => r.error)?.error || null;

    // 3. Resolve the video: prefer the path from the JSON report's
    //    attachments, fall back to scanning test-results/ for the newest .webm.
    let videoPath = null;
    for (const r of results) {
      const videoAttachment = r.attachments?.find((a) => a.name === 'video' && a.path);
      if (videoAttachment) {
        videoPath = videoAttachment.path;
        break;
      }
    }
    if (!videoPath) {
      videoPath = findLatestVideo(TEST_RESULTS_DIR);
    }

    const videoUrl = videoPath
      ? `/videos/${encodeURIComponent(path.relative(TEST_RESULTS_DIR, videoPath))}`
      : null;

    return res.json({
      status: overallStatus,
      durationMs: totalDuration,
      errorMessage: overallStatus === 'failed' ? firstError || 'Test failed. See video for details.' : null,
      videoUrl,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'failed',
      durationMs: Date.now() - startedAt,
      errorMessage: err.message || 'Unexpected server error while running the test.',
      videoUrl: null,
    });
  }
});

/**
 * GET /videos/:relativePath
 * Streams a video file out of test-results/. The relative path is URL
 * encoded by the frontend (mirrors what /api/run-test returned), so we
 * decode it here and resolve it back against TEST_RESULTS_DIR.
 *
 * We deliberately resolve+verify the path stays inside TEST_RESULTS_DIR
 * to prevent directory traversal (e.g. "../../etc/passwd").
 */
app.get('/videos/:relativePath', (req, res) => {
  const decoded = decodeURIComponent(req.params.relativePath);
  const resolved = path.resolve(TEST_RESULTS_DIR, decoded);

  if (!resolved.startsWith(TEST_RESULTS_DIR)) {
    return res.status(400).send('Invalid video path.');
  }
  if (!fs.existsSync(resolved)) {
    return res.status(404).send('Video not found.');
  }

  res.setHeader('Content-Type', 'video/webm');
  fs.createReadStream(resolved).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Playwright UI server running at http://localhost:${PORT}`);
});
