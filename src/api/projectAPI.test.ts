import { MOCK_PROJECTS } from "../mocks/MockProjects"
import projectAPI from "./projectAPI"

describe("projectAPI", () => {
  test("should return records", async () => {
    const response = new Response(undefined, {
      status: 200,
      statusText: "OK",
    })
    response.json = () => Promise.resolve(MOCK_PROJECTS)
    jest.spyOn(window, "fetch").mockImplementation(() => Promise.resolve(response))

    const data = await projectAPI.get()
    return expect(data).toEqual(MOCK_PROJECTS)
  })
})
