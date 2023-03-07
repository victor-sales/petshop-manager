import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import LoginButton from "../../../../../components/Form/FormInputs/Buttons/LoginButton"

describe("Login Button", () => {

    it("should be on screen message", async () => {
        render(<LoginButton text={"login"} />)

        const button = await screen.findByText("login")

        expect(button).toBeInTheDocument()
    })
    
    it("should be disabled", async () => {
        const click = jest.fn()
        
        render(<LoginButton text={"login"} disabled={true} onClick={click} />)

        const button = await screen.findByText("login")

        await userEvent.click(button)
       
        expect(button).toBeDisabled()
        expect(click).not.toHaveBeenCalled()
    })

    it("should call onClick", async () => {
        const click = jest.fn()
        
        render(<LoginButton text={"login"} disabled={false} onClick={click}/>)

        const button = await screen.findByText("login")

        await userEvent.click(button)
       
        expect(click).toHaveBeenCalled()
    })

})