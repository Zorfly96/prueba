import { defineConfig, devices } from "@playwright/test";

const port = 30001;
const url = `http://localhost:${port}`;

export default defineConfig({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: "../test/e2e",

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: [
        [ "html" ],
    ],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: url,

        // Collect trace when retrying the failed test.
        trace: "on-first-retry",
    },
    // Configure projects for major browsers.
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { browserName: "firefox" }
        },
    ],
    // Run your local dev server before starting the tests.
    webServer: {
        command: `node server/server.js --port=${port} --data-dir=./data/playwright-test`,
        url,
        reuseExistingServer: !process.env.CI,
        cwd: "../",

    },
});
