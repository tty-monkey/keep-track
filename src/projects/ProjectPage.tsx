import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSync } from "@fortawesome/free-solid-svg-icons"
import ProjectDetail from "./ProjectDetail.tsx"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { loadProject } from "./projectSlice.ts"
import { AnyAction } from "redux"
import { AppState } from "../../state.ts"
import { ProjectsState } from "./projectsSlice.ts"

function ProjectPage() {
  const dispatch = useDispatch<ThunkDispatch<ProjectsState, any, AnyAction>>()
  const loading = useSelector((appState: AppState) => appState.projectState.loading)
  const project = useSelector((appState: AppState) => appState.projectState.project)
  const error = useSelector((appState: AppState) => appState.projectState.error)

  const params = useParams()
  const id = Number(params.id)

  useEffect(() => {
    dispatch(loadProject(id))
  }, [id, dispatch])

  return (
    <div>
      <>
        {error && (
          <div
            className="mb-4 mt-10 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-10 flex items-center justify-center">
            <FontAwesomeIcon icon={faSync} spin className="mr-2" />
            <p>Loading...</p>
          </div>
        )}

        {project && <ProjectDetail project={project} />}
      </>
    </div>
  )
}

export default ProjectPage
