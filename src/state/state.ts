import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

import { initialProjectState, projectReducer, ProjectState } from "./projectSlice"
import { initialProjectsState, projectsReducer, ProjectsState } from "./projectsSlice"

const reducers = combineReducers({
  projectsState: projectsReducer,
  projectState: projectReducer,
})

function initStore(preloadedState: AppState) {
  return configureStore({
    reducer: reducers,
    preloadedState,
  })
}

export interface AppState {
  projectsState: ProjectsState
  projectState: ProjectState
}

export const initialAppState: AppState = {
  projectsState: initialProjectsState,
  projectState: initialProjectState,
}

export const store = initStore(initialAppState)
