import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import CheckBox from "../../../../../components/Form/FormInputs/CheckBox"

describe("CheckBox", () => {

    it("should be in document", async () => {
        render(<CheckBox label={"checkbox"} checked={false} id="check-id" name={"check-name"} onChange={jest.fn()}/>)

        const input = await screen.findByLabelText("checkbox")
        
        expect(input).toBeInTheDocument()
    })

    it("should have the prop name", async () => {
        render(<CheckBox label={"checkbox"} checked={false} id="check-id" name={"check-name"} onChange={jest.fn()}/>)

        const input = await screen.findByLabelText("checkbox")
        
        expect(input).toHaveAttribute("name", "check-name")
    })

    it("should have prop id", async () => {
        render(<CheckBox label={"checkbox"} checked={false} id="check-id" name={"check-name"} onChange={jest.fn()}/>)

        const input = await screen.findByLabelText("checkbox")
        
        expect(input).toHaveAttribute("id", "check-id")
    })

    it("should be checked", async () => {
        render(<CheckBox label={"checkbox"} checked={true} id="check-id" name={"check-name"} onChange={jest.fn()}/>)

        const input = await screen.findByLabelText("checkbox")
        
        expect(input).toBeChecked()
    })

    it("should not be checked", async () => {
        render(<CheckBox label={"checkbox"} checked={false} id="check-id" name={"check-name"} onChange={jest.fn()}/>)

        const input = await screen.findByLabelText("checkbox")
        
        expect(input).not.toBeChecked()
    })

    it("should call onChange", async () => {
        
        const change = jest.fn()

        render(<CheckBox label={"checkbox"} checked={false} id="check-id" name={"check-name"} onChange={change}/>)

        const input = await screen.findByLabelText("checkbox")

        await userEvent.click(input)
        
        expect(change).toHaveBeenCalled()
    })

})