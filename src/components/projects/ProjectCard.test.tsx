import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"

import Project from "../../models/Project"
import ProjectCard from "./ProjectCard"

describe("<ProjectCard />", () => {
  let project: Project
  let handleEdit: jest.Mock
  const setup = () =>
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>,
    )

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: "Test Project 1",
      description: "Test Description 1",
      imageUrl: "",
      contractTypeId: 1,
      contractSignedOn: new Date(),
      budget: 100,
      isActive: false,
    })
    handleEdit = jest.fn()
  })

  it("should initially render", () => {
    setup()
  })

  it("renders project properly", () => {
    setup()
    expect(screen.getByRole("heading")).toHaveTextContent(project.name)
    // screen.debug(document);
    screen.getByText(/Test Description 1/i)
    screen.getByText(/budget : 100/i)
  })

  it("handler called when edit clicked", async () => {
    setup()
    // this query works screen.getByText(/edit/i)
    // but using role is better
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: /edit/i }))
    expect(handleEdit).toBeCalledTimes(1)
    expect(handleEdit).toBeCalledWith(project)
  })

  test("snapshot", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ProjectCard project={project} onEdit={handleEdit} />
        </MemoryRouter>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
