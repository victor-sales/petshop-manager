import { createMocks } from "node-mocks-http"
import handleUsers from "../../pages/api/users"
import handleUserById, { createUser } from "../../pages/api/users/[userId]"
import NormalizedUser from "../../utils/NormalizedUser"

const user = { _id: "123", user_name: "user teste", email: "user.teste@email.com", phone_number: "", profile: "customer", role: "customer" }
const userWithNoEmail = { _id: "123", user_name: "user teste", email: "", phone_number: "", profile: "customer", role: "customer" }
const userWithNoUsername = { _id: "123", user_name: "", email: "user.teste@email.com", phone_number: "", profile: "customer", role: "customer" }

async function createUserForTest (user) {
    const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'POST', query: { userId: "123" }, body: JSON.stringify(user) });

    await createUser(res, user)
   
    return res._getJSONData()
}   

async function deleteUserForTest () {
    const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'DELETE', query: { userId: "123" } });
    
    await handleUserById(req, res)
}

describe("Get Users", () => {

    it("should return 401 if token not present", async () => {
        const { req, res } = createMocks({ headers: {}, method: 'GET' });

        await handleUsers(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(401)
        expect(response.message.toLowerCase()).toBe("not authorized")
    })

})

describe("Get User By ID", () => {

    it("should return 400 if userId not present", async () => {
        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'GET', query: { userId: "" } });

        await handleUserById(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(400)
        expect(response.message.toLowerCase()).toBe("bad request")
        expect(response.detail.toLowerCase()).toBe("user id is mandatory")
    })
    
    it("should return 404 if user not found", async () => {
        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'GET', query: { userId: "123" } });

        await handleUserById(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(404)
        expect(response.message.toLowerCase()).toBe("not found")
        expect(response.detail.toLowerCase()).toBe("user with id: 123 not found")
    })
    
    it("should return a normalized user", async () => {
        // 1 - Create user
        
        await createUserForTest(user)

        // 2 - Retrieve user

        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'GET', query: { userId: "123" } });
        
        await handleUserById(req, res)
        
        const response = res._getJSONData()

        // 3 - Delete created user
       
        await deleteUserForTest()

        expect(response.response.status).toBe(200)
        expect(response.response.message).toBe("success")
        expect(response.data).toStrictEqual(NormalizedUser(user))
    })

})

describe("Create User by ID", () => {

    it("should return 400 if email not present", async () => {

        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'POST', query: { userId: "123" }, body: JSON.stringify(userWithNoEmail) });
    
        await handleUserById(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(400)
        expect(response.message.toLowerCase()).toBe("bad request")
        expect(response.details.toLowerCase()).toBe("email is required")

    })

    it("should return 400 if user_name not present", async () => {

        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'POST', query: { userId: "123" }, body: JSON.stringify(userWithNoUsername) });
    
        await handleUserById(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(400)
        expect(response.message.toLowerCase()).toBe("bad request")
        expect(response.details.toLowerCase()).toBe("username is required")
    })

    it("should return 409 if user already exists", async () => {
        // 1 - Create user

        await createUserForTest(user)

        // 2 - Create again
        
        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'POST', query: { userId: "123" }, body: JSON.stringify(user) });
    
        await handleUserById(req, res)

        const response = res._getJSONData()

        // 3 - Delete created

        await deleteUserForTest()

        expect(response.status).toBe(409)
        expect(response.message.toLowerCase()).toBe("data conflict")
        expect(response.details.toLowerCase()).toBe("user user.teste@email.com already exists")
    })

    it("should return a normalized user", async () => {
        // 1 - Create user

        const response = await createUserForTest(user)

        // 2 - Delete created
        
        await deleteUserForTest()
        
        expect(response.response.status).toBe(201)
        expect(response.response.message).toBe("success")
        expect(response.data).toStrictEqual(NormalizedUser(user))
    })
})

describe("Edit User by ID", () => {

    it("should return 400 if email not present", async () => {

        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'PUT', query: { userId: "123" }, body: JSON.stringify(userWithNoEmail) });

        await handleUserById(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(400)
        expect(response.message.toLowerCase()).toBe("bad request")
        expect(response.details.toLowerCase()).toBe("email is required")
    })

    it("should return 400 if user_name not present", async () => {
        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'PUT', query: { userId: "123" }, body: JSON.stringify(userWithNoUsername) });

        await handleUserById(req, res)

        const response = res._getJSONData()

        expect(response.status).toBe(400)
        expect(response.message.toLowerCase()).toBe("bad request")
        expect(response.details.toLowerCase()).toBe("username is required")
    })

    it("should return a edited normalized user", async () => {
        // 1 - Create user

        const createdUser = await createUserForTest(user)

        // 2 - Edit created user

        const editedUser = {...createdUser.data, user_name: "user teste editado"} 

        const { req, res } = createMocks({ headers: { "access-token": "123" }, method: 'PUT', query: { userId: "123" }, body: JSON.stringify(editedUser) });

        await handleUserById(req, res)

        const response = res._getJSONData()

        // 3 - Delete user

        await deleteUserForTest()

        expect(response.response.status).toBe(200)
        expect(response.response.message).toBe("success")
        expect(response.data).toStrictEqual(editedUser)
        expect(response.data.user_name).toBe(editedUser.user_name)
    }) 

})