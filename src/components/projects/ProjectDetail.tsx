import Project from "../../models/Project"

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="m-4 flex flex-col items-center justify-center border-b border-gray-200 bg-slate-200 p-4 text-center md:border-r">
      <img className="" src={project.imageUrl} alt={project.name} />
      <section>
        <h3 className="mt-2">
          <strong>{project.name}</strong>
        </h3>
        <p>{project.description}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        <p>Signed: {project.contractSignedOn.toLocaleDateString()}</p>
        <p>
          <mark className="active"> {project.isActive ? "active" : "inactive"}</mark>
        </p>
      </section>
    </div>
  )
}
