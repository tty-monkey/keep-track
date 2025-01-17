import Project from "../models/Project"
import ProjectDto from "../types/ProjectDto"
import { getApiUrl } from "./config"
const baseUrl = getApiUrl()
export const url = `${baseUrl}/projects`

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again"
    case 403:
      return "You do not have permission to view the projects"
    default:
      return "There was an error retrieving the project(s). Please try again"
  }
}

function checkStatus(response: Response) {
  if (response.ok) {
    return response
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    }
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`)

    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status)
    throw new Error(errorMessage)
  }
}

function parseJSON(response: Response) {
  return response.json()
}

function delay<T>(ms: number) {
  return function (x: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms))
  }
}

function convertToProjectModels(data: ProjectDto[]): Project[] {
  return data.map(convertToProjectModel)
}

function convertToProjectModel(item: ProjectDto): Project {
  return new Project(item)
}

const projectAPI = {
  get(page = 1, limit = 9) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error) => {
        console.log("log client error " + error)
        throw new Error("There was an error retrieving the projects. Please try again", error)
      })
  },
  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error " + error)
        throw new Error("There was an error updating the project. Please try again later")
      })
  },
  find(id: number) {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModel)
      .catch((error: TypeError) => {
        console.log("log client error " + error)
        throw new Error("There was an error retrieving the project. Please try again")
      })
  },
}

export default projectAPI
