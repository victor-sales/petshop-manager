import { createContext, useEffect } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods } from "../utils/Enums";

const UsersContext = createContext()

export function UsersProvider({children}) {

    const handleRequest = async (url, method, body, accessToken) => {
        
        const options = {
            headers: { 
                "access-token": accessToken 
            },
            method: method,
            body: JSON.stringify(body)
        }

        let response =  await fetch(url, options)
        response = await response.json()

        return response

    }

    const handleCreateUser = async (accessToken, username, email, profile = "customer", role = "customer") => {
        
        const userId = uuid()
        const user = { id: userId, user_name: username, email: email, phone_number: "", profile: profile, role: role }
        
        const url = `/api/users/${userId}`
        const method = APIMethods.POST
        const body = user

        console.log(user)
        try {
            
            let response = await handleRequest(url, method, body, accessToken)

            console.log(response)
            return response

        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <UsersContext.Provider
            value={{
                handleCreateUser
            }}
        >
            { children }
        </UsersContext.Provider>
        
    )
}

export default UsersContext;
