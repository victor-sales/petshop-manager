import { createContext, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";
import RequestRendler from "../utils/RequestHandler";

const BreedsContext = createContext()

export function BreedsProvider({children}) {

    const [breeds, setBreeds] = useState([])
    const [breedsMessage, setBreedsMessage] = useState("")
    const [breedsMessageType, setBreedsMessageType] = useState("")
    const [loadingBreeds, setLoadingBreeds] = useState(false)
    // const [loadingCreateAnimal, setLoadingCreateAnimal] = useState(false)
    // const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)

 
    async function handleGetBreeds (accessToken) {

        setLoadingBreeds(true)

        const url = `/api/breeds`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)

            if (response.response?.status === 200) {
                setLoadingBreeds(false)
                setBreeds(response.data)
                return response.data
            } else {
                setLoadingBreeds(false)
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingBreeds(false)
            let e = JSON.parse(error.message)
            setBreedsMessageType(MessageTypes.ERROR)
            setBreedsMessage(e.message)
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

    

    // const handleCreateAnimal = async (accessToken, animal) => {
                
    //     const url = `/api/users/${animal.id}`
    //     const method = APIMethods.POST
    //     const body = animal

    //     try {
    //         setLoadingCreateAnimal(true)
            
    //         let response = await RequestRendler(accessToken, url, method, body, RequestActionType.CREATE_ANIMAL)

    //         if (response.response?.status === 201) {
    //             setLoadingCreateAnimal(false)
    //             setAnimalMessageType(MessageTypes.SUCCESS)
    //             setUserMessage(`Animal criado com sucesso.`)

    //             return response

    //         } else {
    //             setLoadingCreateAnimal(false)
    //             throw new Error(JSON.stringify(response))
    //         }

    //     } catch (error) {
    //         let e = JSON.parse(error.message)
    //         setAnimalMessageType(MessageTypes.ERROR)
    //         setAnimalMessage(e.message + ": " + e.details ?? "")
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
        <BreedsContext.Provider
            value={{
                handleGetBreeds,
                // handleGetUserById,
                // handleCreateAnimal,
                // handleUpdateUser,
                breeds,
                breedsMessage, setBreedsMessage,
                breedsMessageType, setBreedsMessageType,
                loadingBreeds,
                // loadingCreateAnimal,
                // loadingUpdateUser
            }}
        >
            { children }
        </BreedsContext.Provider>
        
    )
}

export default BreedsContext;
