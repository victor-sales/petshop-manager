import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import SocialMediaLoginButton from "../../../../../components/Form/FormInputs/Buttons/SocialMediaLoginButton"

describe("Social Media Login Button", () => {

    it("should be on screen message", async () => {
        render(<SocialMediaLoginButton socialMediaName={"facebook"} socialMediaIcon={faAdd}/>)

        const span = await screen.findByText("Entrar com facebook")
        const button = span.parentElement

        expect(button).toBeInTheDocument()
    })

    it("should have the icon passed", async () => {
        render(<SocialMediaLoginButton socialMediaName={"facebook"} socialMediaIcon={faAdd} />)

        const span = await screen.findByText("Entrar com facebook")
        const icon = span.previousElementSibling

        expect(icon).toHaveClass("fa-plus")
    })

    it("should call onClick", async () => {
        const click = jest.fn()
        
        render(<SocialMediaLoginButton onClick={click} socialMediaName={"facebook"} socialMediaIcon={faAdd} />)

        const span = await screen.findByText("Entrar com facebook")
        const button = span.parentElement

        await userEvent.click(button)
       
        expect(click).toHaveBeenCalled()
    })

})