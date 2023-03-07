import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import InputMoney from "../../../../../components/Form/FormInputs/Input/InputMoney"

describe("Input", () => {
    

    it("should be in document", async () => {
        render(<InputMoney value="" setValue={jest.fn} error="" disabled={false} />)

        const input = await screen.findByLabelText("Preço*")
        
        expect(input).toBeInTheDocument()
    })


    it("should show error", async () => {
        render(<InputMoney value="" setValue={jest.fn} error="mensagem de error" disabled={false} />)

        const error = await screen.findByText("mensagem de error")

        expect(error).toBeTruthy()
        expect(error).toHaveTextContent("mensagem de error")
    })

    it("should be disabled", async () => {
        render(<InputMoney value="" setValue={jest.fn} error="" disabled={true} />)

        const input = await screen.findByLabelText("Preço*")
      
        expect(input).toBeDisabled()
    })

    it("should change state value", async () => {
        const setValueMock = jest.fn()
        jest.spyOn(React, "useState").mockImplementation(initState => [initState, setValueMock])

        render(<InputMoney value="" setValue={setValueMock} error="" disabled={false} />)

        const input = await screen.findByLabelText("Preço*")

        await userEvent.type(input, "80")

        expect(setValueMock).toHaveBeenCalledTimes(2)
        expect(setValueMock).toHaveBeenLastCalledWith("0")
    })

})