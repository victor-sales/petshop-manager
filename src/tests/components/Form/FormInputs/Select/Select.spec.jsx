import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import Select from "../../../../../components/Form/FormInputs/Select"

describe("Select base", () => {

    const change = jest.fn()

    it("should be in document", async () => {
        render(<Select id={"input-id"} value="select-value" onChange={change} labelText={"select-label"} error="" readOnly={false} disabled={false} />)

        const select = await screen.findByLabelText("select-label")
        
        expect(select).toBeInTheDocument()
    })

    it("should have the prop id", async () => {
        render(<Select id={"input-id"} value="select-value" onChange={change} labelText={"select-label"} error="" readOnly={false} disabled={false} />)

        const select = await screen.findByLabelText("select-label")
      
        expect(select).toHaveAttribute("id", "input-id")
    })

    it("should have prop value", async () => {
        render(
            <Select id={"input-id"} value="1" onChange={change} labelText={"select-label"} error="" readOnly={false} disabled={false}>
                <option value="1">1</option>
                <option value="2">2</option>
            </Select>
        )

        const select = await screen.findByLabelText("select-label")

        expect(select).toHaveValue("1")
    })

    it("should show error", async () => {
        render(<Select id={"input-id"} value="select-value" onChange={change} labelText={"select-label"} error="mensagem de error" readOnly={false} disabled={false} />)

        const select = await screen.findByLabelText("select-label")
        const error = select.nextElementSibling
        expect(error).toBeTruthy()
        expect(error).toHaveTextContent("mensagem de error")
    })

    it("should be disabled", async () => {
        render(<Select id={"input-id"} value="select-value" onChange={change} labelText={"select-label"} error="" readOnly={false} disabled={true} />)

        const select = await screen.findByLabelText("select-label")
      
        expect(select).toBeDisabled()
    })

   
    it("should render option childrens", async () => {
        
        render(
            <Select id={"input-id"} value="select-value" onChange={change} labelText={"select-label"} error="" readOnly={false} disabled={false}>
                <option value="1">1</option>
                <option value="2">2</option>
            </Select>
        )

        const option = await screen.findByText("1")

        expect(option).toBeTruthy()
    })

    it("should call onChange", async () => {
        
        render(
            <Select id={"input-id"} value="1" onChange={change} labelText={"select-label"} error="" readOnly={false} disabled={false}>
                <option value="1">1</option>
                <option value="2">2</option>
            </Select>
        )

        const select = await screen.findByLabelText("select-label")

        await userEvent.selectOptions(select, "1")
     
        expect(change).toHaveBeenCalled()
    })


})