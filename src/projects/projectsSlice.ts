import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { projectAPI } from "./projectAPI"
import { Project } from "./Project"

export interface ProjectsState {
  loading: boolean
  projects: Project[]
  error: string | undefined
  page: number
}

export const initialProjectsState: ProjectsState = {
  loading: false,
  projects: [],
  error: undefined,
  page: 1,
}

export const loadProjects = createAsyncThunk(
  "projects/loadProjects",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await projectAPI.get(page)
      return { projects: response, page }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue("An unknown error occurred")
    }
  },
)

export const saveProject = createAsyncThunk(
  "projects/saveProject",
  async (project: Project, { rejectWithValue }) => {
    try {
      return await projectAPI.put(project)
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue("An unknown error occurred")
    }
  },
)

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialProjectsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.projects = action.payload.projects
        } else {
          state.projects = [...state.projects, ...action.payload.projects]
        }
        state.loading = false
        state.page = action.payload.page
        state.error = undefined
      })
      .addCase(loadProjects.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload
      })
      .addCase(saveProject.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(saveProject.fulfilled, (state, action) => {
        if (action.payload.isNew) {
          state.projects = [...state.projects, action.payload]
        } else {
          state.projects = state.projects.map((project) => {
            return project.id === action.payload.id ? { ...project, ...action.payload } : project
          })
        }
        state.loading = false
        state.error = undefined
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload
      })
  },
})

const { actions, reducer } = projectsSlice

export const projectsActions = actions
export const projectsReducer = reducer
