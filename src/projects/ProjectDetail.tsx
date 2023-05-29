import { Project} from "./Project"

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center border-b border-gray-200 md:border-r m-4 bg-slate-200">
      <img className="" src={project.imageUrl} alt={project.name} />
      <section>
        <h3 className="mt-2">
          <strong>{project.name}</strong>
        </h3>
        <p>{project.description}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        <p>Signed: {project.contractSignedOn.toLocaleDateString()}</p>
        <p>
          <mark className="active">
            {' '}
            {project.isActive ? 'active' : 'inactive'}
          </mark>
        </p>
      </section>
    </div>
  )
}
