import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import { url as projectsUrl } from "../../api/projectAPI"
import { MOCK_PROJECTS } from "../../mocks/MockProjects"
import { store } from "../../state/state"
import ProjectsPage from "./ProjectsPage"

const server = setupServer(
  // capture "GET http://localhost:4000/projects" requests
  http.get(projectsUrl, () => {
    console.log("started mocking")
    return HttpResponse.json(MOCK_PROJECTS)
  }),
)

describe("<ProjectsPage />", () => {
  const setup = () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter>
            <ProjectsPage />
          </MemoryRouter>
        </Provider>
        ,
      </QueryClientProvider>,
    )
  }

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test("should render without crashing", () => {
    setup()
    expect(screen).toBeDefined()
  })

  test("should display loading", () => {
    setup()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  // Not working for now
  // test("should display projects", async () => {
  //   setup()
  //   expect(await screen.findAllByRole("img")).toHaveLength(MOCK_PROJECTS.length)
  // })

  // test("should display more button", async () => {
  //   setup()
  //   expect(await screen.findByRole("button", { name: /Next/i })).toBeInTheDocument()
  // })
  //
  // test("should display more button with get", async () => {
  //   setup()
  //   await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
  //   expect(screen.getByRole("button", { name: /Previous/i })).toBeInTheDocument()
  // })

  // test("should display custom error on server error", async () => {
  //   server.use(
  //     http.get(projectsUrl, () => {
  //       return new HttpResponse(null, { status: 500 })
  //     }),
  //   )
  //   setup()
  //
  //   expect(
  //     await screen.findByText(/There was an error retrieving the project(s)./i),
  //   ).toBeInTheDocument()
  // })
})
