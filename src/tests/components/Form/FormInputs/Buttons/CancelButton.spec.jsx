import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import CancelButton from "../../../../../components/Form/FormInputs/Buttons/CancelButton"

describe("Cancel Button", () => {

    it("should be on screen message", async () => {
        render(<CancelButton />)

        const button = await screen.findByText("Cancelar")
        
        expect(button).toBeInTheDocument()
    })

    it("should call onClick", async () => {
        const click = jest.fn()
        
        render(<CancelButton onClick={click} />)

        const button = await screen.findByText("Cancelar")

        await userEvent.click(button)
       
        expect(click).toHaveBeenCalled()
    })

})