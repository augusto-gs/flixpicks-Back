/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  resolver: "jest-ts-webcompat-resolver",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
};
