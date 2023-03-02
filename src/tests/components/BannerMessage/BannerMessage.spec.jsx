import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import BannerMessage from "../../../components/BannerMessage/BannerMessage"
import { MessageTypes } from "../../../utils/Enums"

describe("Banner Message", () => {

    it("should show message", async () => {
        render(<BannerMessage message={"teste"} setMessage={() => {}} type={MessageTypes.ERROR} setType={() => {}}/>)

        const text = await screen.findByText("teste")
        
        expect(text).toBeTruthy()
        expect(text).toHaveTextContent("teste")
    })

    it("should have a red text and background", async () => {
        render(<BannerMessage message={"teste"} setMessage={() => {}} type={MessageTypes.ERROR} setType={() => {}}/>)

        const text = await screen.findByText("teste")
       
        expect(text).toHaveClass("text-red-800")
        expect(text.parentElement.parentElement).toHaveClass("bg-red-300")
    })

    it("should have a green text and background", async () => {
        render(<BannerMessage message={"teste"} setMessage={() => {}} type={MessageTypes.SUCCESS} setType={() => {}}/>)

        const text = await screen.findByText("teste")
       
        expect(text).toHaveClass("text-green-800")
        expect(text.parentElement.parentElement).toHaveClass("bg-green-300")
    })

    it("should have a blue text and background", async () => {
        render(<BannerMessage message={"teste"} setMessage={() => {}} type={""} setType={() => {}}/>)

        const text = await screen.findByText("teste")
       
        expect(text).toHaveClass("text-blue-800")
        expect(text.parentElement.parentElement).toHaveClass("bg-blue-300")
    })

    it("should clear message", async () => {
        jest.spyOn(console, "log")
        const setMessageMock = jest.fn()
        jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setMessageMock])

        const setTypeMock = jest.fn()
        jest.spyOn(React, "useState").mockImplementationOnce(initState => [initState, setTypeMock])

        render(<BannerMessage message={"teste"} setMessage={setMessageMock} type={""} setType={setTypeMock}/>)

        const button = await screen.findByText("x")
        console.log(button)
        await userEvent.click(button)
        console.log(setMessageMock)
        expect(setMessageMock).toHaveBeenCalledTimes(1)
        expect(setMessageMock).toHaveBeenCalledWith("")
        expect(setTypeMock).toHaveBeenCalledTimes(1)
        expect(setTypeMock).toHaveBeenCalledWith("")
    })
})