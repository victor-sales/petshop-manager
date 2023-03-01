import { createContext, useEffect, useState } from "react"
import useAuthContext from "../hooks/useAuthContext";
import { APIMethods, MessageTypes } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const UserAccountContext = createContext()

export function UserAccountProvider({children}) {

    const { token } = useAuthContext()

    const [userAccount, setUserAccount] = useState({})
    const [userAccountMessage, setUserAccountMessage] = useState("")
    const [userAccountMessageType, setUserAccountMessageType] = useState("")
    const [loadingUserAccount, setLoadingUserAccount] = useState(false)

    async function handleGetMyAccount (accessToken) {
        setLoadingUserAccount(true)

        const url = `/api/user_account`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)
        
            if (response.response?.status === 200) {
                setLoadingUserAccount(false)
                setUserAccount(response.data)
                return response.data
            } else {
                setLoadingUserAccount(false)
                setUserAccount([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            (error)
            setLoadingUserAccount(false)
            let e = JSON.parse(error.message)
            setUserAccountMessageType(MessageTypes.ERROR)
            setUserAccountMessage(e.message)
            return false
        }

    }


    useEffect(() => {
        const loadMyAccount = async () => {
            await handleGetMyAccount(token)
        }

        if (token) loadMyAccount()
    }, [token])

    return ( 
        <UserAccountContext.Provider
            value={{
                userAccount,
                userAccountMessage, setUserAccountMessage,
                userAccountMessageType, setUserAccountMessageType,
                loadingUserAccount,
                handleGetMyAccount
            }}
        >
            { children }
        </UserAccountContext.Provider>
        
    )
}

export default UserAccountContext;
