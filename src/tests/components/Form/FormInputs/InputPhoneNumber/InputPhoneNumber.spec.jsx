import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import InputPhoneNumber from "../../../../../components/Form/FormInputs/InputPhoneNumber/"

describe("Input", () => {
    

    it("should be in document", async () => {
        render(<InputPhoneNumber id={"input-phone"} labelText={"label-phone"} value="" setValue={jest.fn} error="" />)

        const input = await screen.findByLabelText("label-phone")
        
        expect(input).toBeInTheDocument()
    })


    it("should show error", async () => {
        render(<InputPhoneNumber id={"input-phone"} labelText={"label-phone"} value="" setValue={jest.fn} error="mensagem de error" />)

        const error = await screen.findByText("mensagem de error")

        expect(error).toBeTruthy()
        expect(error).toHaveTextContent("mensagem de error")
    })

    it("should change state value", async () => {
        const setValueMock = jest.fn()
        jest.spyOn(React, "useState").mockImplementation(initState => [initState, setValueMock])

        render(<InputPhoneNumber id={"input-phone"} labelText={"label-phone"} value="" setValue={setValueMock} error="" />)

        const input = await screen.findByLabelText("label-phone")

        await userEvent.type(input, "80")

        expect(setValueMock).toHaveBeenCalledTimes(4)
    })

})