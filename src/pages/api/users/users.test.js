import BadRequest from "../../../utils/ErrorsObj/BadRequest"
import { userIsInvalid } from "../../../utils/Helpers"

describe("Validate User" , () => {
    it("should return a Bad Request if body not present", () => {
        
        let error = BadRequest()
        error = {...error, details: "Body not found"}
        
        let invalid = userIsInvalid()

        expect(invalid).toStrictEqual(error)
        expect(invalid.status).toBe(400)
        expect(invalid.details).toBe("Body not found")
        expect(invalid.message).toBe("Bad request")
    })
    
    it.todo("should return a Bad Request if email not present")
    
    it.todo("should return a Bad Request if user_name not present")

    it.todo("should return false if user is valid")
    
})

describe("Duplicated User" , () => {
    it.todo("should return a Conflict if user already exists")

    it.todo("should return false if user don't exists")

})

describe("Get Users", () => {
    it.todo("should return 401 if token not present")

    it.todo("should return a list of normalized users")

})

describe("Get User By ID", () => {
    it.todo("should return 401 if token not present")

    it.todo("should return 400 if userId not present")
    
    it.todo("should return 404 if user not found")
    
    it.todo("should return a normalized user")

})

describe("Create User by ID", () => {

    it.todo("should return 400 if email not present")

    it.todo("should return 400 if user_name not present")

    it.todo("should return 409 if user already exists")

    it.todo("should return a normalized user")

})

describe("Edit User by ID", () => {

    it.todo("should return 400 if email not present")

    it.todo("should return 400 if user_name not present")

    it.todo("should return a edited normalized user") 

})