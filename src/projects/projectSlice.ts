import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { projectAPI } from './projectAPI'
import { Project } from './Project'

export interface ProjectState {
  loading: boolean
  project: Project | undefined
  error: string | undefined
}

export const initialProjectState: ProjectState = {
  loading: false,
  project: undefined,
  error: undefined,
}

export const loadProject = createAsyncThunk(
  'project/loadProject',
  async(id: number, { rejectWithValue }) => {
    try {
      return await projectAPI.find(id)
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue("An unknown error occurred")
    }
  }
)

const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProject.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(loadProject.fulfilled, (state, action) => {
        state.loading = false
        state.project = action.payload
        state.error = undefined
      })
      .addCase(loadProject.rejected, (state, action) => {
        state.loading = false
        // @ts-ignore
        state.error = action.payload
      })
  },
})

const { actions, reducer } = projectSlice

export const projectActions = actions
export const projectReducer = reducer
