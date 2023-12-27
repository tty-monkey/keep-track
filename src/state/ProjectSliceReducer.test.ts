import { PayloadAction } from "@reduxjs/toolkit"

import Project from "../models/Project"
import { initialProjectState, loadProject, projectReducer } from "./projectSlice"

describe("projectSlice reducer", () => {
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

  test("handles loadProject.pending action", () => {
    const action = { type: loadProject.pending.type }
    const expectedState = {
      ...initialProjectState,
      loading: true,
    }
    expect(projectReducer(initialProjectState, action)).toEqual(expectedState)
  })

  test("handles loadProject.fulfilled action", () => {
    const action = {
      type: loadProject.fulfilled.type,
      payload: mockProject,
    }
    const expectedState = {
      ...initialProjectState,
      loading: false,
      project: mockProject,
    }
    expect(projectReducer(initialProjectState, action as PayloadAction<Project>)).toEqual(
      expectedState,
    )
  })

  test("handles loadProject.rejected action", () => {
    const errorMessage = "Error loading project"
    const action = {
      type: loadProject.rejected.type,
      payload: errorMessage,
    }
    const expectedState = {
      ...initialProjectState,
      loading: false,
      error: errorMessage,
    }
    expect(projectReducer(initialProjectState, action as PayloadAction<string>)).toEqual(
      expectedState,
    )
  })
})
