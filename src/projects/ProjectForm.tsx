import { Project } from './Project'
import { SyntheticEvent, useState } from "react"
import { useSaveProject } from './projectHooks'

interface ProjectFormProps {
  project: Project
  onCancel: () => void
}

function ProjectForm({
  project: initialProject,
  onCancel
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject)
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    budget: '',
  })
  //const dispatch = useDispatch<ThunkDispatch<ProjectsState, any, AnyAction>>();
  const { mutate: saveProject, isLoading } = useSaveProject()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!isValid()) return
    //dispatch(saveProject(project))
    saveProject(project)
  }

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target
    let updatedValue = type === 'checkbox' ? checked : value

    if (type === 'number') {
      updatedValue = Number(updatedValue)
    }

    const change = {
      [name]: updatedValue
    }

    let updatedProject: Project

    setProject((p) => {
      updatedProject = new Project({ ...p, ...change })
      return updatedProject
    })
    setErrors(() => validate(updatedProject))
  }

  const validate = (project: Project) => {
    const errors = {
      name: '',
      description: '',
      budget: '',
    }

    if (project.name.length === 0) {
      errors.name = 'Name is required'
    }

    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters'
    }

    if (project.description.length === 0) {
      errors.description = 'Description is required'
    }

    if (project.budget === 0) {
      errors.budget = 'Budget must be more than $0'
    }

    return errors
  }

  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    )
  }

  return (
    <form
      className="flex flex-col justify-center p-4 pl-8 pr-8 text-center border-b border-gray-200 md:border-r m-4 bg-slate-200 h-96"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="name"
        >
          Project Name
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="name"
          placeholder="enter name"
          value={project.name}
          onChange={handleChange}
        />
        {errors.name.length > 0 && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute" role="alert">
            {errors.name}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="description"
        >
          Project Description
        </label>
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="description"
          placeholder="enter description"
          value={project.description}
          onChange={handleChange}
        />
        {errors.description.length > 0 && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute" role="alert">
            {errors.description}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="budget"
        >
          Project Budget
        </label>
        <input
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          name="budget"
          placeholder="enter budget"
          value={project.budget}
          onChange={handleChange}
        />
        {errors.budget.length > 0 && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute" role="alert">
            {errors.budget}
          </div>
        )}
      </div>
      <div className="flex items-start mb-4">
        <div className="flex items-center h-5">
          <input
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            type="checkbox"
            name="isActive"
            checked={project.isActive}
            onChange={handleChange}
          />
        </div>
        <label
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor="isActive"
        >
          Active?
        </label>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-grey-900 bg-white inline-flex items-center hover:text-blue-700 border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
