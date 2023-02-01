import { createContext, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";
import RequestRendler from "../utils/RequestHandler";

const AnimalsContext = createContext()

export function AnimalsProvider({children}) {

    const [userMessage, setUserMessage] = useState("")
    const [userMessageType, setUserMessageType] = useState("")
    const [loadingAnimals, setLoadingAnimals] = useState(false)
    const [loadingCreateUser, setLoadingCreateUser] = useState(false)
    const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)

 
    async function handleGetAnimals (accessToken) {
        setLoadingAnimals(true)

        const url = `/api/animals`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)

            if (response.response?.status === 200) {
                setLoadingAnimals(false)
                return response.data
            } else {
                setLoadingAnimals(false)
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingAnimals(false)
            let e = JSON.parse(error.message)
            setUserMessageType(MessageTypes.ERROR)
            setUserMessage(e.message)
            return false
        }

    }

    // async function handleGetUserById (accessToken, userId) {
    //     const url = `/api/users/${userId}`
    //     const method = APIMethods.GET

    //     try {
    //         let response = await RequestRendler(accessToken, url, method)
        
    //         if (response.response?.status === 200) {
    //             return response.data
    //         } else {
    //             throw new Error(JSON.stringify(response))
    //         }
                       
    //     } catch (error) {
    //         let e = JSON.parse(error.message)
    //         setUserMessageType(MessageTypes.ERROR)
    //         setUserMessage(e.message)
    //         return false
    //     }
    // }

    

    // const handleCreateUser = async (accessToken, actionType, userId, username, email, password = null, phone_number = "", profile = "cliente", role = "cliente", isProvider = false) => {
        
    //     const uid = isProvider ? userId : uuid()
        
    //     const user = { id: uid, user_name: username, email: email, password: password, phone_number: phone_number, profile: profile, role: role, isProvider: isProvider }

    //     const url = `/api/users/${uid}`
    //     const method = APIMethods.POST
    //     const body = user

    //     try {
    //         setLoadingCreateUser(true)
            
    //         let response = await RequestRendler(accessToken, url, method, body, actionType)

    //         if (response.response?.status === 201) {
    //             setLoadingCreateUser(false)
    //             setUserMessageType(MessageTypes.SUCCESS)

    //             actionType === RequestActionType.SIGNUP ? 
    //                 setUserMessage(`Usuário criado com sucesso. Retorne à página de SigIn para acessar a aplicação`) :
    //                 setUserMessage(`Usuário criado com sucesso. A senha para acesso é o e-mail informado`)

    //             return response

    //         } else {
    //             setLoadingCreateUser(false)
    //             throw new Error(JSON.stringify(response))
    //         }

    //     } catch (error) {
    //         let e = JSON.parse(error.message)
    //         setUserMessageType(MessageTypes.ERROR)
    //         setUserMessage(e.message + ": " + e.details ?? "")
    //         return false
    //     }
    // }

    // async function handleUpdateUser (accessToken, user) {        
    //     const url = `/api/users/${user.id}`
    //     const method = APIMethods.PUT
    //     const body = user

    //     try {
    //         setLoadingUpdateUser(true)
            
    //         let response = await RequestRendler(accessToken, url, method, body, RequestActionType.UPDATE_USER)

    //         if (response.response?.status === 200) {
    //             setLoadingUpdateUser(false)
    //             setUserMessageType(MessageTypes.SUCCESS)
    //             setUserMessage(`Dados alterados com sucesso`)

    //             return response

    //         } else {
    //             setLoadingUpdateUser(false)
    //             throw new Error(JSON.stringify(response))
    //         }

    //     } catch (error) {
    //         let e = JSON.parse(error.message)
    //         setUserMessageType(MessageTypes.ERROR)
    //         setUserMessage(e.message + ": " + e.details ?? "")
    //         return false
    //     }
    // }

    return ( 
        <AnimalsContext.Provider
            value={{
                handleGetAnimals,
                // handleGetUserById,
                // handleCreateUser,
                // handleUpdateUser,
                // userMessage, setUserMessage,
                // userMessageType, setUserMessageType,
                loadingAnimals,
                // loadingCreateUser,
                // loadingUpdateUser
            }}
        >
            { children }
        </AnimalsContext.Provider>
        
    )
}

export default AnimalsContext;
