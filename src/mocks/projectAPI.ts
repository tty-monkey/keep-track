import { MOCK_PROJECTS } from "./MockProjects"
const projectAPI = {
  find(id: number) {
    const project = MOCK_PROJECTS.find((p) => p.id === id)
    return project ? Promise.resolve(project) : Promise.reject(new Error("Project not found"))
  },
}

export default projectAPI
