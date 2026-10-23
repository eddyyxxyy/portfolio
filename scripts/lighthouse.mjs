import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join } from "node:path";
import process from "node:process";
import { setTimeout as wait } from "node:timers/promises";

import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const host = "http://127.0.0.1:4321";
const quickRun = process.env.LIGHTHOUSE_QUICK === "1";
const routes = quickRun ? ["/"] : ["/", "/pt-br/"];
const profiles = quickRun ? ["mobile"] : ["mobile", "desktop"];
const minimumPerformance = Number(
  process.env.LIGHTHOUSE_PERFORMANCE_MIN ?? "0.95",
);
let server;
let chrome;
let chromeProfile;
const failures = [];

const serverIsReady = async () => {
  try {
    const response = await fetch(host);
    return response.ok;
  } catch {
    return false;
  }
};

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await serverIsReady()) return;
    await wait(250);
  }

  throw new Error("Timed out waiting for Astro preview.");
};

const assertMinimum = (condition, message) => {
  if (!condition) failures.push(message);
};

try {
  if (!(await serverIsReady())) {
    server = spawn(
      "npm",
      ["run", "preview", "--", "--host", "127.0.0.1"],
      {
        env: process.env,
        stdio: ["ignore", "ignore", "inherit"],
      },
    );
  }
  await waitForServer();
  const systemTempDirectory = tmpdir();
  const tempRoot = isAbsolute(systemTempDirectory)
    ? systemTempDirectory
    : "/tmp";
  chromeProfile = await mkdtemp(join(tempRoot, "portfolio-lighthouse-"));
  chrome = await launch({
    chromePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome",
    chromeFlags: [
      "--disable-gpu",
      "--headless=new",
      "--no-sandbox",
      `--user-data-dir=${chromeProfile}`,
    ],
    // chrome-launcher converts this path to a Windows UNC path under WSL,
    // even when the selected browser is the native Linux Chrome binary.
    userDataDir: false,
  });

  const runLighthouse = (route, profile) =>
    lighthouse(`${host}${route}`, {
      logLevel: "error",
      onlyCategories: [
        "accessibility",
        "best-practices",
        "performance",
        "seo",
      ],
      output: "json",
      port: chrome.port,
      preset: profile === "desktop" ? "desktop" : undefined,
    });

  // The first throttled pass on a fresh browser pays for font decode.
  await runLighthouse(routes[0], profiles[0]);

  for (const route of routes) {
    for (const profile of profiles) {
      const result = await runLighthouse(route, profile);

      if (!result) {
        failures.push(`${route} (${profile}): Lighthouse returned no result`);
        continue;
      }

      const { audits, categories } = result.lhr;
      const scores = {
        accessibility: categories.accessibility.score ?? 0,
        bestPractices: categories["best-practices"].score ?? 0,
        performance: categories.performance.score ?? 0,
        seo: categories.seo.score ?? 0,
      };
      const label = `${route} (${profile})`;

      process.stdout.write(
        `${label}: performance ${Math.round(scores.performance * 100)}, ` +
          `accessibility ${Math.round(scores.accessibility * 100)}, ` +
          `best practices ${Math.round(scores.bestPractices * 100)}, ` +
          `SEO ${Math.round(scores.seo * 100)}\n`,
      );

      for (const categoryId of [
        "accessibility",
        "best-practices",
        "performance",
        "seo",
      ]) {
        const failedAudits = categories[categoryId].auditRefs
          .filter(({ weight }) => weight > 0)
          .map(({ id }) => audits[id])
          .filter((audit) => audit?.score !== null && audit?.score < 1);
        for (const audit of failedAudits) {
          process.stdout.write(
            `  ${categoryId}: ${audit.id} — ${audit.title}` +
              `${audit.displayValue ? ` (${audit.displayValue})` : ""}\n`,
          );
          if (
            audit.id === "errors-in-console" ||
            audit.id === "inspector-issues"
          ) {
            process.stdout.write(
              `    ${JSON.stringify(audit.details?.items ?? [])}\n`,
            );
          }
        }
      }
      if (quickRun && scores.performance < 1) {
        process.stdout.write(
          `  lcp breakdown: ${JSON.stringify(
            audits["lcp-breakdown-insight"]?.details?.items ?? [],
          )}\n`,
        );
      }

      assertMinimum(
        scores.performance >= minimumPerformance,
        `${label}: performance below ${minimumPerformance * 100}`,
      );
      for (const [category, score] of Object.entries(scores)) {
        if (category === "performance") continue;
        assertMinimum(score === 1, `${label}: ${category} must score 100`);
      }

      const metricBudgets = {
        "cumulative-layout-shift": 0.1,
        "first-contentful-paint": 1800,
        "largest-contentful-paint": 2500,
        "speed-index": 3400,
        "total-blocking-time": 200,
      };

      for (const [auditId, maximum] of Object.entries(metricBudgets)) {
        const value = audits[auditId]?.numericValue ?? Number.POSITIVE_INFINITY;
        assertMinimum(
          value <= maximum,
          `${label}: ${auditId} ${value} exceeds ${maximum}`,
        );
      }
    }
  }
} finally {
  chrome?.kill();
  if (chromeProfile) {
    await rm(chromeProfile, { force: true, recursive: true });
  }
  server?.kill("SIGTERM");
}

if (failures.length > 0) {
  process.stderr.write(
    `${failures.map((failure) => `- ${failure}`).join("\n")}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write("Lighthouse quality budgets passed.\n");
}
