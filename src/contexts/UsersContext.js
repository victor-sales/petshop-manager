import { createContext, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const UsersContext = createContext()

export function UsersProvider({children}) {

    const [users, setUsers] = useState([])
    const [userMessage, setUserMessage] = useState("")
    const [userMessageType, setUserMessageType] = useState("")
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadingCreateUser, setLoadingCreateUser] = useState(false)
    const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)
 
    async function handleGetUserById (accessToken, userId) {
        const url = `/api/users/${userId}`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)
        
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
            let response = await RequestHandler(accessToken, url, method)
        
            if (response.response?.status === 200) {
                setLoadingUsers(false)
                setUsers(response.data)
                return response.data
            } else {
                setLoadingUsers(false)
                setUsers([])
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

    const handleCreateUser = async (accessToken, actionType, userId, username, email, password = null, phone_number = "", profile = "cliente", role = "cliente", isProvider = false) => {
        
        const uid = isProvider ? userId : uuid()
        
        const user = { id: uid, user_name: username, email: email, password: password, phone_number: phone_number, profile: profile, role: role, isProvider: isProvider }

        const url = `/api/users/${uid}`
        const method = APIMethods.POST
        const body = user

        try {
            setLoadingCreateUser(true)
            
            let response = await RequestHandler(accessToken, url, method, body, actionType)

            if (response.response?.status === 201) {
                setLoadingCreateUser(false)
                setUserMessageType(MessageTypes.SUCCESS)

                actionType === RequestActionType.SIGNUP ? 
                    setUserMessage(`Usuário criado com sucesso. Retorne à página de SigIn para acessar a aplicação`) :
                    setUserMessage(`Usuário criado com sucesso. A senha para acesso é o e-mail informado`)

                return response

            } else {
                setLoadingCreateUser(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setUserMessageType(MessageTypes.ERROR)
            setUserMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleUpdateUser (accessToken, user) {        
        const url = `/api/users/${user.id}`
        const method = APIMethods.PUT
        const body = user

        try {
            setLoadingUpdateUser(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.UPDATE_USER)

            if (response.response?.status === 200) {
                setLoadingUpdateUser(false)
                setUserMessageType(MessageTypes.SUCCESS)
                setUserMessage(`Dados alterados com sucesso`)

                return response

            } else {
                setLoadingUpdateUser(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setUserMessageType(MessageTypes.ERROR)
            setUserMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    return ( 
        <UsersContext.Provider
            value={{
                handleGetUserById,
                handleGetUsers,
                handleCreateUser,
                handleUpdateUser,
                users,
                userMessage, setUserMessage,
                userMessageType, setUserMessageType,
                loadingUsers,
                loadingCreateUser,
                loadingUpdateUser
            }}
        >
            { children }
        </UsersContext.Provider>
        
    )
}

export default UsersContext;
