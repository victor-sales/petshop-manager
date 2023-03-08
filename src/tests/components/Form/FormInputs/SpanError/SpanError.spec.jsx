import { render, screen } from "@testing-library/react"
import React from "react"
import SpanError from "../../../../../components/Form/FormInputs/SpanError"

describe("Span Error", () => {

    it("should be on screen message", async () => {
        render(<SpanError error={"mensagem de erro"} />)

        const span = await screen.findByText("mensagem de erro")
        
        expect(span).toBeInTheDocument()
    })

    it("should not be on screen", () => {
        render(<SpanError error={""} />)

        const span = screen.queryByText("mensagem de erro")
        
        expect(span).not.toBeInTheDocument()
    })

})