import mongoose from "mongoose";
import { createMocks } from "node-mocks-http"
import handleUsers from "../../pages/api/users"

describe("Duplicated User" , () => {
    it.todo("should return a Conflict if user already exists")

    it.todo("should return false if user don't exists")

})

describe("Get Users", () => {

    // beforeAll(() => {
    //     dbConnect()
    // })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    it("should return 401 if token not present", async () => {
        const { req, res } = createMocks({
            headers: {},
            method: 'GET',
        });

        await handleUsers(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(401)
        expect(response.message.toLowerCase()).toBe("not authorized")
    })

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