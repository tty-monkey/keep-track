import { Project } from "./Project.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


function formatDescription(description: string): string {
  return description.substring(0, 60) + '...'
}

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
}

function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props

  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center border-b border-gray-200 md:border-r m-4 bg-slate-200 h-96">
      <img className="max-h-48" src={project.imageUrl} alt={project.name} />
      <section>
        <Link to={'/projects/' + project.id}>
          <h5 className="mt-2">
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button
          className="py-2.5 px-5 mt-4 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => {
            handleEditClick(project)
          }}
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </button>
      </section>
    </div>
  )
}

export default ProjectCard
