import BadRequest from "../../utils/ErrorsObj/BadRequest"
import { userIsInvalid } from "../../utils/Helpers"

describe("Validate User" , () => {
    
    let error = BadRequest()
    let invalid = null
    let body = null
    let req = null

    afterEach(() => {
        error = BadRequest()
        invalid = null
        body = null
        req = null
    });

    it("should return a Bad Request if body not present", () => {
        
        error = {...error, details: "Body not found"}
        
        invalid = userIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(error.status)
        expect(invalid.details).toBe(error.details)
        expect(invalid.message).toBe(error.message)
    })
    
    it("should return a Bad Request if email not present", () => {
        
        body = JSON.stringify({ email: "" })
        
        req = { body: body }
        
        error = {...error, details: "Email is required"}
        
        invalid = userIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toBe(error.details)
    })
    
    it("should return a Bad Request if user_name not present", () => {
        
        body = JSON.stringify({ email: "email.teste@email.com", user_name: "" })
        
        req = { body: body }
        
        error = {...error, details: "Username is required"}
        
        invalid = userIsInvalid(req)
        
        expect(invalid).toStrictEqual(error)
        expect(invalid.details).toStrictEqual(error.details)
    })

    it("should return false if user is valid", () => {
        body = JSON.stringify({ email: "user.teste@email.com", user_name: "User Teste" })
        
        req = { body: body }

        invalid = userIsInvalid(req)

        expect(invalid).toBe(false)

    })
})