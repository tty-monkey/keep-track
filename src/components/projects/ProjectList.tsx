import { useState } from "react"

import Project from "../../models/Project"
import ProjectCard from "./ProjectCard"
import ProjectForm from "./ProjectForm"

interface ProjectListProps {
  projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({})

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project)
  }

  const cancelEditing = () => {
    setProjectBeingEdited({})
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div key={project.id}>
          {project === projectBeingEdited ? (
            <ProjectForm project={project} onCancel={cancelEditing} />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
          )}
        </div>
      ))}
    </div>
  )
}
