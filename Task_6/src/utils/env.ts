import dotenv from "dotenv";

const environment = process.env.ENV;

const validEnvironments = ["dev", "qa"] as const;

if (!environment) {
  throw new Error(
    "Environment is not specified. Please provide ENV (e.g. ENV=dev or ENV=qa).",
  );
}

if (!validEnvironments.includes(environment as any)) {
  throw new Error(
    `Invalid environment '${environment}'. Valid environments are: ${validEnvironments.join(", ")}.`,
  );
}

const result = dotenv.config({
  path: `.env.${environment}`,
});

if (result.error) {
  throw new Error(`Unable to load .env.${environment}`);
}

export const env = {
  baseUrl: process.env.BASE_URL!,
  username: process.env.USERNAME!,
  password: process.env.PASSWORD!,
};
