import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import Project from "../../models/Project"
import { store } from "../../state/state"
import ProjectForm from "./ProjectForm"

const queryClient = new QueryClient()

describe("<ProjectForm />", () => {
  let project: Project
  let updatedProject: Project
  let handleCancel: jest.Mock
  let nameTextBox: any
  let descriptionTextBox: HTMLElement
  let budgetTextBox: HTMLElement

  const setup = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter>
            <ProjectForm project={project} onCancel={handleCancel} />
          </MemoryRouter>
        </Provider>
        ,
      </QueryClientProvider>,
    )

    nameTextBox = screen.getByRole("textbox", {
      name: /project name/i,
    })
    descriptionTextBox = screen.getByRole("textbox", {
      name: /project description/i,
    })
    budgetTextBox = screen.getByRole("spinbutton", {
      name: /project budget/i,
    })
  }

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: "Mission Impossible",
      description: "This is really difficult",
      imageUrl: "placeholder_url",
      contractTypeId: 123,
      contractSignedOn: new Date("2023-01-01"),
      budget: 100,
      isActive: true,
    })
    updatedProject = new Project({
      name: "Ghost Protocol",
      description:
        "Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...",
      imageUrl: "placeholder_url",
      contractTypeId: 456,
      contractSignedOn: new Date("2023-01-02"),
      budget: 200,
      isActive: false,
    })
    handleCancel = jest.fn()
  })

  test("should load project into form", () => {
    setup()
    expect(
      screen.getByRole("form", {
        name: /edit a project/i,
      }),
    ).toHaveFormValues({
      name: project.name,
      description: project.description,
      budget: project.budget,
      isActive: project.isActive,
    })
  })

  test("should accept input", async () => {
    setup()
    const user = userEvent.setup()
    await user.clear(nameTextBox)
    await user.type(nameTextBox, updatedProject.name)
    expect(nameTextBox).toHaveValue(updatedProject.name)

    await user.clear(descriptionTextBox)
    await user.type(descriptionTextBox, updatedProject.description)
    expect(descriptionTextBox).toHaveValue(updatedProject.description)

    await user.clear(budgetTextBox)
    await user.type(budgetTextBox, updatedProject.budget.toString())
    expect(budgetTextBox).toHaveValue(updatedProject.budget)
  })

  test("name should display required validation", async () => {
    setup()
    const user = userEvent.setup()
    await user.clear(nameTextBox)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  test("name should display minlength validation", async () => {
    setup()
    const user = userEvent.setup()
    await user.clear(nameTextBox)
    await user.type(nameTextBox, "ab")
    expect(screen.getByRole("alert")).toBeInTheDocument()
    await user.type(nameTextBox, "c")
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })

  test("budget should display not 0 validation", async () => {
    setup()
    const user = userEvent.setup()
    await user.clear(budgetTextBox)
    await user.type(budgetTextBox, "0")
    expect(screen.getByRole("alert")).toBeInTheDocument()
    await user.type(budgetTextBox, "1")
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })
})
