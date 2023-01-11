import { createContext, useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes } from "../utils/Enums";

const UsersContext = createContext()

export function UsersProvider({children}) {

    const [userMessage, setUserMessage] = useState("")
    const [userMessageType, setUserMessageType] = useState("")
    const [counter, setCounter] = useState(5)
    const [startTimer, setStartTimer] = useState(false)

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

        try {
            let response = await handleRequest(url, method, body, accessToken)
            console.log(response)
            if (response.response.status === 201) {
                startCounterToRedirect()
                setUserMessageType(MessageTypes.SUCCESS)
                setUserMessage(`Usuário criado com sucesso. Você sera redirecionado para o login em: ${counter}s`)
                return response

            } else {
                console.log(JSON.stringify(response))
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            console.error(JSON.parse(error))
            console.error(error)
            // setUserMessageType(MessageTypes.ERROR)
            // setUserMessage(error.message)
            // return false
        }
    }

    const startCounterToRedirect = () => setInterval(() => setCounter(counter - 1), 1000);

    useEffect(() => {
        if (counter < 1) {
            clearInterval(startCounterToRedirect)
            setCounter(5)
        }
        //eslint-disable-next-line
    }, [counter])

    // useEffect(() => {
    //     let timer = null
    //     if (startTimer) {

    //     } 
    // }, [startTimer, counter])

    useEffect(() => {
        console.log(counter)
    }, [counter])
    

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
