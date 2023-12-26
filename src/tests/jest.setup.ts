import "@testing-library/jest-dom"

jest.mock("../api/config", () => ({
  getApiUrl: () => "http://mocked-api-url.com",
}))
