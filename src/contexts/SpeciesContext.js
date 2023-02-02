import { createContext, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";
import RequestRendler from "../utils/RequestHandler";

const SpeciesContext = createContext()

export function SpeciesProvider({children}) {

    const [species, setSpecies] = useState([])
    const [speciesMessage, setSpeciesMessage] = useState("")
    const [speciesMessageType, setSpeciesMessageType] = useState("")
    const [loadingSpecies, setLoadingSpecies] = useState(false)
    // const [loadingCreateAnimal, setLoadingCreateAnimal] = useState(false)
    // const [loadingUpdateUser, setLoadingUpdateUser] = useState(false)

 
    async function handleGetSpecies (accessToken) {

        setLoadingSpecies(true)

        const url = `/api/species`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)

            if (response.response?.status === 200) {
                setLoadingSpecies(false)
                setSpecies(response.data)
                return response.data
            } else {
                setLoadingSpecies(false)
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingSpecies(false)
            let e = JSON.parse(error.message)
            setSpeciesMessageType(MessageTypes.ERROR)
            setSpeciesMessage(e.message)
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
        <SpeciesContext.Provider
            value={{
                handleGetSpecies,
                // handleGetUserById,
                // handleCreateAnimal,
                // handleUpdateUser,
                species,
                speciesMessage, setSpeciesMessage,
                speciesMessageType, setSpeciesMessageType,
                loadingSpecies,
                // loadingCreateAnimal,
                // loadingUpdateUser
            }}
        >
            { children }
        </SpeciesContext.Provider>
        
    )
}

export default SpeciesContext;
