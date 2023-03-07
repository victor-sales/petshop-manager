import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import Input from "../../../../../components/Form/FormInputs/Input"

describe("Input", () => {
    const change = jest.fn()
    const blur = jest.fn()
    const focus = jest.fn()

    it("should be in document", async () => {
        render(<Input id={"input-id"} type={"text"} value="input-value" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="" readOnly={false} disabled={false} />)

        const input = await screen.findByLabelText("input-label")
        
        expect(input).toBeInTheDocument()
    })

    it("should have the prop id", async () => {
        render(<Input id={"input-id"} type={"text"} value="input-value" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="" readOnly={false} disabled={false} />)

        const input = await screen.findByLabelText("input-label")
      
        expect(input).toHaveAttribute("id", "input-id")
    })

    it("should have prop type", async () => {
        render(<Input id={"input-id"} type={"text"} value="input-value" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="" readOnly={false} disabled={false} />)

        const input = await screen.findByLabelText("input-label")
      
        expect(input).toHaveAttribute("type", "text")
    })

    it("should have prop value", async () => {
        render(<Input id={"input-id"} type={"text"} value="input-value" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="" readOnly={false} disabled={false} />)

        const input = await screen.findByLabelText("input-label")
      
        expect(input).toHaveValue("input-value")
    })

    it("should show error", async () => {
        render(<Input id={"input-id"} type={"text"} value="input-value" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="mensagem de error" readOnly={false} disabled={false} />)

        const input = await screen.findByLabelText("input-label")
        const error = input.nextElementSibling
        expect(error).toBeTruthy()
        expect(error).toHaveTextContent("mensagem de error")
    })

    it("should be disabled", async () => {
        render(<Input id={"input-id"} type={"text"} value="input-value" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="" readOnly={false} disabled={true} />)

        const input = await screen.findByLabelText("input-label")
      
        expect(input).toBeDisabled()
    })

    it("should call onChange", async () => {
        
        render(<Input id={"input-id"} type={"text"} value="" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="" readOnly={false} disabled={false} />)

        const input = await screen.findByLabelText("input-label")

        await act(async () => {
            await userEvent.type(input, "abc")
        })
        
        expect(change).toHaveBeenCalled()
    })

    it("should call focus", async () => {
        
        render(<Input id={"input-id"} type={"text"} value="input-value" onChange={change} labelText={"input-label"} required onBlur={blur} onFocus={focus} error="" readOnly={false} disabled={false} />)

        const input = await screen.findByLabelText("input-label")

        await userEvent.click(input)
        
        expect(focus).toHaveBeenCalled()
    })

})