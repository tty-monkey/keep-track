import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import projectAPI from "../api/projectAPI"
import Project from "../models/Project"

export function useProjects() {
  const [page, setPage] = useState(0)

  const queryInfo = useQuery(["projects", page], () => projectAPI.get(page + 1), {
    keepPreviousData: true,
  })

  return {
    ...queryInfo,
    page,
    setPage,
  }
}

export function useSaveProject() {
  const queryClient = useQueryClient()
  return useMutation((project: Project) => projectAPI.put(project), {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  })
}
