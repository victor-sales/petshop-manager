import { createContext, useEffect } from "react"
import { v4 as uuid } from 'uuid';

const UsersContext = createContext()

export function UsersProvider({children}) {

    const handleCreateUser = async (accessToken, username, email, profile = "customer", role = "customer") => {
        const userId = uuid()
        
        const user = { id: userId, user_name: username, email: email, phone_number: "", profile: profile, role: role }
        console.log(user)
        try {
            let response = await fetch(`/api/users/${userId}`, { headers: { "access-token": accessToken },  method: "POST", body: JSON.stringify(user) })

            response = await response.json()
            
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
