import { ChangeEvent, SyntheticEvent, useState } from "react"

import { useSaveProject } from "../../hooks/projectHooks"
import Project from "../../models/Project"

interface ProjectFormProps {
  project: Project
  onCancel: () => void
}

export default function ProjectForm({ project: initialProject, onCancel }: ProjectFormProps) {
  const [project, setProject] = useState(initialProject)
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  })
  //const dispatch = useDispatch<ThunkDispatch<ProjectsState, any, AnyAction>>();
  const { mutate: saveProject } = useSaveProject()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!isValid()) return
    //dispatch(saveProject(project))
    saveProject(project)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { type, name, value } = event.target
    let updatedValue: string | number | boolean = value

    if (type === "checkbox") {
      const input = event.target as HTMLInputElement
      updatedValue = input.checked
    } else if (type === "number") {
      updatedValue = Number(value)
    }

    if (type === "number") {
      updatedValue = Number(updatedValue)
    }

    const change = {
      [name]: updatedValue,
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
      name: "",
      description: "",
      budget: "",
    }

    if (project.name.length === 0) {
      errors.name = "Name is required"
    }

    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters"
    }

    if (project.description.length === 0) {
      errors.description = "Description is required"
    }

    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0"
    }

    return errors
  }

  const isValid = () => {
    return errors.name.length === 0 && errors.description.length === 0 && errors.budget.length === 0
  }

  return (
    <form
      className="m-4 flex h-96 flex-col justify-center border-b border-gray-200 bg-slate-200 p-4 pl-8 pr-8 text-center md:border-r"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="name"
        >
          Project Name
        </label>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          name="name"
          placeholder="enter name"
          value={project.name}
          onChange={handleChange}
        />
        {errors.name.length > 0 && (
          <div
            className="absolute mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errors.name}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="description"
        >
          Project Description
        </label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          name="description"
          placeholder="enter description"
          value={project.description}
          onChange={handleChange}
        />
        {errors.description.length > 0 && (
          <div
            className="absolute mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errors.description}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="budget"
        >
          Project Budget
        </label>
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="number"
          name="budget"
          placeholder="enter budget"
          value={project.budget}
          onChange={handleChange}
        />
        {errors.budget.length > 0 && (
          <div
            className="absolute mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errors.budget}
          </div>
        )}
      </div>
      <div className="mb-4 flex items-start">
        <div className="flex h-5 items-center">
          <input
            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
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
          className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-grey-900 inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
