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
    const [loadingDeleteUser, setLoadingDeleteUser] = useState(false)
 
    async function handleGetUserById (accessToken, userId, requestType) {
        const url = `/api/users/${userId}`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method, null, requestType)
        
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
    
    async function handleDeleteUser (accessToken, user) {        
        const url = `/api/users/${user.id}`
        const method = APIMethods.DELETE
        const body = user

        try {
            setLoadingDeleteUser(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.DELETE_USER)

            if (response.response?.status === 200) {
                setLoadingDeleteUser(false)
                setUserMessageType(MessageTypes.SUCCESS)
                setUserMessage(`Remoção de conta com sucesso`)
                return response

            } else {
                setLoadingDeleteUser(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setUserMessageType(MessageTypes.ERROR)
            setUserMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    function exportUsers () {
        try {
            if (users.length) handleExportFile(users, `usuarios.csv`)
            else alert("Não é possível exportar com dados vazios");
        } catch (error) {
            alert("Erro ao processar exportação");
        }
    }

    function handleExportFile (users, fileName) {
        let rows = users.sort((a, b) => a.user_name.localeCompare(b.user_name)).map(user => ([
                user.user_name,
                user.email,
                user.phone_number,
                user.profile,
                user.role
        ]))
       
        let headers = ["Nome", "E-mail", "Telefone", "Perfil", "Função"]
        
        let table = [headers, ...rows]

        table = table.map(e => e.join(",")).join("\n")

        let csvContent = "data:text/csv;charset=utf-8," + table;
        let link = document.createElement("a");

        link.download = fileName;
        link.href = csvContent;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 

    }

    return ( 
        <UsersContext.Provider
            value={{
                handleGetUserById,
                handleGetUsers,
                handleCreateUser,
                handleUpdateUser,
                handleDeleteUser,
                exportUsers,
                users,
                userMessage, setUserMessage,
                userMessageType, setUserMessageType,
                loadingUsers,
                loadingCreateUser,
                loadingUpdateUser,
                loadingDeleteUser
            }}
        >
            { children }
        </UsersContext.Provider>
        
    )
}

export default UsersContext;
