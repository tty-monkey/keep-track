import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { initialProjectsState, projectsReducer, ProjectsState } from './src/projects/projectsSlice'
import { initialProjectState, projectReducer, ProjectState } from './src/projects/projectSlice'

const reducers = combineReducers({
  projectsState: projectsReducer,
  projectState: projectReducer
})

export default function initStore(preloadedState: AppState) {
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
};

export const store = initStore(initialAppState);
