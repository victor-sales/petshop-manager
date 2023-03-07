import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"
import SellDatePicker from "../../../../../components/Form/FormInputs/DatePicker/SellDatePicker"

describe("Sell Date Picker", () => {

    it("should be in document", async () => {
        render(<SellDatePicker id={"picker"} date={new Date} />)

        const input = await screen.findByLabelText("Data*")
        
        expect(input).toBeInTheDocument()
    })

    it("shoud show date selector", async () => {
        render(<SellDatePicker id={"picker"} date={new Date} />)

        const input = await screen.findByLabelText("Data*")
        
        await act(async () => {
            await userEvent.click(input)
        })
        
        const calendar = await screen.findByText("dom")
        
        expect(calendar).toBeTruthy()
        expect(calendar).toBeInTheDocument()
    })
})