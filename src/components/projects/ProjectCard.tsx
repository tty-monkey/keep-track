import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import Project from "../../models/Project"

function formatDescription(description: string): string {
  return description.substring(0, 60) + "..."
}

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
}

export default function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props

  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited)
  }

  return (
    <div className="m-4 flex h-96 flex-col items-center justify-center border-b border-gray-200 bg-slate-200 p-4 text-center md:border-r">
      <img className="max-h-48" src={project.imageUrl} alt={project.name} />
      <section>
        <Link to={"/projects/" + project.id}>
          <h5 className="mt-2">
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button
          className="mb-2 mr-2 mt-4 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          aria-label={`edit ${project.name}`}
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
