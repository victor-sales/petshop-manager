import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"
import DatePicker from "../../../../../components/Form/FormInputs/DatePicker"

describe("Date Picker", () => {

    it("should be in document", async () => {
        render(<DatePicker id={"picker"} date={new Date} />)

        const input = await screen.findByLabelText("Data*")
        
        expect(input).toBeInTheDocument()
    })

    it("shoud show date selector", async () => {
        render(<DatePicker id={"picker"} date={new Date} />)

        const input = await screen.findByLabelText("Data*")
        
        await act(async () => {
            await userEvent.click(input)
        })

        const calendar = await screen.findByText("dom")

        expect(calendar).toBeInTheDocument()
    })

    it("shoud have some hours disabled", async () => {
        render(<DatePicker id={"picker"} date={new Date}/>)

        const input = await screen.findByLabelText("Data*")
        
        await act(async () => {
            await userEvent.click(input)
        })
        
        const hour1 = await screen.findByText("07:30")

        expect(hour1).toHaveClass("react-datepicker__time-list-item--disabled")
    })


})