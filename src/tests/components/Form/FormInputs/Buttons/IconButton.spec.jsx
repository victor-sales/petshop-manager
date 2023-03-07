import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import IconButton from "../../../../../components/Form/FormInputs/Buttons/IconButton"

describe("Icon Button", () => {

    it("should be on screen message", async () => {
        render(<IconButton title={"button"} iconName={faAdd}/>)

        const span = await screen.findByText("button")
        const button = span.parentElement

        expect(button).toBeInTheDocument()
    })

    it("should have the id passed", async () => {
        
        render(<IconButton id={"icon-button"} title={"button"} iconName={faAdd} />)

        const span = await screen.findByText("button")
        const spinner = span.parentElement
       
        expect(spinner).toBeInTheDocument()
        expect(spinner).toHaveAttribute("id", "icon-button")
    })

    it("should have the icon passed", async () => {
        render(<IconButton title={"button"} iconName={faAdd} />)

        const span = await screen.findByText("button")
        const icon = span.previousElementSibling

        expect(icon).toHaveClass("fa-plus")
    })

    it("should call onClick", async () => {
        const click = jest.fn()
        
        render(<IconButton onClick={click} title={"button"} iconName={faAdd} />)

        const span = await screen.findByText("button")
        const button = span.parentElement

        await userEvent.click(button)
       
        expect(click).toHaveBeenCalled()
    })

})