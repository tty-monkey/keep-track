import { Project } from "./Project.ts"
import ProjectCard from "./ProjectCard.tsx"
import ProjectForm from "./ProjectForm.tsx"
import { useState } from "react"

interface ProjectListProps {
  projects: Project[]
}

function ProjectList({ projects }: ProjectListProps) {
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

export default ProjectList
