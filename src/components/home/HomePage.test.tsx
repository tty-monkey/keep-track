import { render, screen } from "@testing-library/react"
import renderer from "react-test-renderer"

import HomePage from "./HomePage"

describe("<HomePage />", () => {
  test("should render without crashing", () => {
    render(<HomePage />)
  })

  test("renders home heading", () => {
    render(<HomePage />)
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Redefining Connections Through Architecture.",
    )
  })

  test("snapshot", () => {
    const tree = renderer.create(<HomePage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
