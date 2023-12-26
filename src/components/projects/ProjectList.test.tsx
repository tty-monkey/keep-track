import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import { MOCK_PROJECTS } from "../../api/MockProjects"
import { store } from "../../state/state"
import ProjectList from "./ProjectList"

describe("<ProjectList />", () => {
  const setup = () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter>
            <ProjectList projects={MOCK_PROJECTS} />
          </MemoryRouter>
        </Provider>
        ,
      </QueryClientProvider>,
    )
  }

  beforeEach(() => {})

  test("should render without crashing", () => {
    setup()
    expect(screen).toBeDefined()
  })

  test("should display list", () => {
    setup()
    expect(screen.getAllByRole("heading")).toHaveLength(MOCK_PROJECTS.length)
    expect(screen.getAllByRole("img")).toHaveLength(MOCK_PROJECTS.length)
    expect(screen.getAllByRole("link")).toHaveLength(MOCK_PROJECTS.length)
    expect(screen.getAllByRole("button")).toHaveLength(MOCK_PROJECTS.length)
  })

  test("should display form when edit clicked", async () => {
    setup()
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: /edit Wisozk Group/i }))
    expect(
      screen.getByRole("form", {
        name: /edit a project/i,
      }),
    ).toBeInTheDocument()
  })

  test("should display image and remove form when cancel clicked", async () => {
    setup()
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: /edit Wisozk Group/i }))
    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    )
    expect(
      screen.getByRole("img", {
        name: /wisozk group/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("form", {
        name: /edit a project/i,
      }),
    ).not.toBeInTheDocument()
  })
})
