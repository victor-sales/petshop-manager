import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes } from "../utils/Enums";

const UsersContext = createContext()

export function UsersProvider({children}) {

    const SIGNUP = "SIGNUP"
    const Router = useRouter()
    const [userMessage, setUserMessage] = useState("")
    const [userMessageType, setUserMessageType] = useState("")
    const [loadingUsers, setLoadingUsers] = useState(false)

    const handleRequest = async (accessToken, url, method, body, actionType) => {
        
        let options = {
            headers: { 
                "access-token": accessToken,
                "action-type": actionType
            },
            method: method
        }

        if (body) {
            options = {...options, body: JSON.stringify(body)}
        } 

        let response = await fetch(url, options)
        
        response = await response.json()

        return response

    }

    const handleCreateUser = async (accessToken, actionType, userId, username, email, password = null, profile = "customer", role = "customer", isProvider = false) => {
        
        const uid = isProvider ? userId : uuid()
        
        const user = { id: uid, user_name: username, email: email, password: password, phone_number: "", profile: profile, role: role, isProvider: isProvider }

        const url = `/api/users/${uid}`
        const method = APIMethods.POST
        const body = user

        try {
            let response = await handleRequest(accessToken, url, method, body, actionType)

            if (response.response?.status === 201) {

                setUserMessageType(MessageTypes.SUCCESS)
                setUserMessage(`Usuário criado com sucesso. Retorne à página de SigIn para acessar a aplicação`)

                return response

            } else {
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setUserMessageType(MessageTypes.ERROR)
            setUserMessage(e.message + ": " + e.details ?? "")
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

    async function handleGetUsers (accessToken) {
        setLoadingUsers(true)

        const url = `/api/users`
        const method = APIMethods.GET

        try {
            let response = await handleRequest(accessToken, url, method)
        
            if (response.response?.status === 200) {
                setLoadingUsers(false)
                return response.data
            } else {
                setLoadingUsers(false)
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingUsers(false)
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
                handleGetUsers,
                userMessage, setUserMessage,
                userMessageType, setUserMessageType,
                loadingUsers
            }}
        >
            { children }
        </UsersContext.Provider>
        
    )
}

export default UsersContext;
