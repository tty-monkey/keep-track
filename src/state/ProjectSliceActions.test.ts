import { AnyAction } from "redux"
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store"
import thunk, { ThunkDispatch } from "redux-thunk"

import projectAPI from "../api/projectAPI"
import Project from "../models/Project" // Using the mocked API
import { initialProjectState, loadProject, ProjectState } from "./projectSlice"

jest.mock("../api/projectAPI", () => ({
  find: jest.fn(),
}))

const mockFind = projectAPI.find as jest.Mock

const middlewares = [thunk]

const mockStore = configureMockStore<ProjectState, ThunkDispatch<ProjectState, void, AnyAction>>(
  middlewares,
)

describe("loadProject thunk", () => {
  let store: MockStoreEnhanced<ProjectState, ThunkDispatch<ProjectState, void, AnyAction>>

  beforeEach(() => {
    store = mockStore(initialProjectState)
  })

  test("handles successful project load", async () => {
    const mockProject = new Project({
      id: 1,
      name: "Johnson - Kutch",
      description:
        "Fully-configurable intermediate framework. Ullam occaecati libero laudantium nihil voluptas omnis.",
      imageUrl: "/assets/placeimg_500_300_arch4.jpg",
      contractTypeId: 3,
      contractSignedOn: "2013-08-04T22:39:41.473Z",
      budget: 54637,
      isActive: false,
    })
    mockFind.mockResolvedValue(mockProject)

    await store.dispatch(loadProject(1))

    const actions = store.getActions()
    expect(actions[0].type).toBe(loadProject.pending.type)
    expect(actions[1].type).toBe(loadProject.fulfilled.type)
    expect(actions[1].payload).toEqual(mockProject)
  })

  test("handles failed project load", async () => {
    const errorMessage = "Network error"
    mockFind.mockRejectedValue(new Error(errorMessage))

    await store.dispatch(loadProject(1))
    const actions = store.getActions()

    expect(actions[0].type).toBe(loadProject.pending.type)
    expect(actions[1].type).toBe(loadProject.rejected.type)
    expect(actions[1].payload).toBe(errorMessage)
  })

  test("handles no project found", async () => {
    mockFind.mockResolvedValue(null)

    await store.dispatch(loadProject(999))

    const actions = store.getActions()
    expect(actions[0].type).toBe(loadProject.pending.type)
    expect(actions[1].type).toBe(loadProject.rejected.type)
    expect(actions[1].payload).toBe("Project not found")
  })

  test("handles unexpected API error", async () => {
    mockFind.mockRejectedValue(new Error("Some error"))

    await store.dispatch(loadProject(1))

    const actions = store.getActions()
    expect(actions[0].type).toBe(loadProject.pending.type)
    expect(actions[1].type).toBe(loadProject.rejected.type)
    expect(actions[1].payload).toBe("Some error")
  })
})
