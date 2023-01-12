import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes } from "../utils/Enums";

const UsersContext = createContext()

export function UsersProvider({children}) {

    const Router = useRouter()
    const [userMessage, setUserMessage] = useState("")
    const [userMessageType, setUserMessageType] = useState("")

    const handleRequest = async (accessToken, url, method, body) => {
        
        let options = {
            headers: { 
                "access-token": accessToken 
            },
            method: method
        }

        if (body) {
            options = {...options, body: JSON.stringify(body)}
        } 

        let response =  await fetch(url, options)
        response = await response.json()

        return response

    }

    const handleCreateUser = async (accessToken, userId, username, email, profile = "customer", role = "customer") => {
        
        const user = { id: userId, user_name: username, email: email, phone_number: "", profile: profile, role: role }
        
        const url = `/api/users/${userId}`
        const method = APIMethods.POST
        const body = user

        try {
            let response = await handleRequest(accessToken, url, method, body)

            if (response.response?.status === 201) {
                
                setUserMessageType(MessageTypes.SUCCESS)
                setUserMessage(`Usuário criado com sucesso. Retorne à página de SigIn para acessar a aplicação`)
                console.log(Router)//Router.push("/")
                return response

            } else {
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setUserMessageType(MessageTypes.ERROR)
            setUserMessage(e.message)
            return false
        }
    }
 
    async function handleGetUserById (accessToken, userId) {
        const url = `/api/users/${userId}`
        const method = APIMethods.GET

        try {
            let response = await handleRequest(accessToken, url, method)
        
            if (response.response?.status === 200) {
                return response.data
            } else {
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            let e = JSON.parse(error.message)
            setUserMessageType(MessageTypes.ERROR)
            setUserMessage(e.message)
            return false
        }
    }

    return ( 
        <UsersContext.Provider
            value={{
                handleCreateUser,
                handleGetUserById,
                userMessage,
                userMessageType
            }}
        >
            { children }
        </UsersContext.Provider>
        
    )
}

export default UsersContext;
