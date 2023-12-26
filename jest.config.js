/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  setupFiles: ["<rootDir>/src/tests/jest.polyfills.js"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
}
