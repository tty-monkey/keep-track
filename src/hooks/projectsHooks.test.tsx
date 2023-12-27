import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { act, renderHook } from "@testing-library/react-hooks"
import { ReactNode } from "react" // Replace with the actual file path

import projectAPI from "../api/projectAPI"
import Project from "../models/Project"
import { useProjects, useSaveProject } from "./projectHooks"

jest.mock("../api/projectAPI", () => ({
  get: jest.fn(),
  put: jest.fn(),
}))

const mockGet = projectAPI.get as jest.Mock
const mockPut = projectAPI.put as jest.Mock

describe("useProjects hook", () => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  test("should fetch projects and handle page state", async () => {
    mockGet.mockResolvedValue([
      {
        id: 1,
        name: "Test Project 1",
        description: "Test Description 1",
        imageUrl: "",
        contractTypeId: 1,
        contractSignedOn: new Date(),
        budget: 100,
        isActive: false,
      },
    ])

    const { result, waitFor } = renderHook(() => useProjects(), { wrapper })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.page).toBe(0)

    act(() => result.current.setPage(1))

    expect(result.current.page).toBe(1)
  })

  test("should call put method and invalidate queries on success", async () => {
    const mockProject = new Project({
      id: 1,
      name: "Test Project 1",
      description: "Test Description 1",
      imageUrl: "",
      contractTypeId: 1,
      contractSignedOn: new Date(),
      budget: 100,
      isActive: false,
    })
    mockPut.mockResolvedValue(mockProject)

    const { result, waitFor } = renderHook(() => useSaveProject(), { wrapper })

    result.current.mutate(mockProject)

    await waitFor(() => result.current.isSuccess)

    expect(projectAPI.put).toHaveBeenCalledWith(mockProject)
  })
})
