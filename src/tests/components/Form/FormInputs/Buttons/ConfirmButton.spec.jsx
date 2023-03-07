import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import ConfirmButton from "../../../../../components/Form/FormInputs/Buttons/ConfirmButton"

describe("Confirm Button", () => {

    it("should be on screen message", async () => {
        render(<ConfirmButton />)

        const span = await screen.findByText("Confirmar")
        const button = span.parentElement

        expect(button).toBeInTheDocument()
    })

    it("should show spinner", async () => {
        
        render(<ConfirmButton loading={true} />)

        const span = await screen.findByText("Confirmar")
        const spinner = span.previousElementSibling
       
        expect(spinner).toBeInTheDocument()
        expect(spinner).toHaveClass("animate-spin")
    })
    
    it("should call onClick", async () => {
        const click = jest.fn()
        
        render(<ConfirmButton onClick={click} />)

        const span = await screen.findByText("Confirmar")
        const button = span.parentElement

        await userEvent.click(button)
       
        expect(click).toHaveBeenCalled()
    })

})