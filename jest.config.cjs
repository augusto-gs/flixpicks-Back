/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  resolver: "jest-ts-webcompat-resolver",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  coveragePathIgnorePatterns: [
    "src/index.ts",
    "src/database/index.ts",
    "src/setupTests.ts",
    "src/server/app.ts",
    "src/server/index.ts",
  ],
};
