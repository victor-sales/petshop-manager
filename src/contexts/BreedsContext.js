import { createContext, useState } from "react"
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";
import RequestRendler from "../utils/RequestHandler";

const BreedsContext = createContext()

export function BreedsProvider({children}) {

    const [breeds, setBreeds] = useState([])
    const [breedsMessage, setBreedsMessage] = useState("")
    const [breedsMessageType, setBreedsMessageType] = useState("")
    const [loadingBreeds, setLoadingBreeds] = useState(false)
    const [loadingCreateBreed, setLoadingCreateBreed] = useState(false)
    const [loadingUpdateBreed, setLoadingUpdateBreed] = useState(false)
    const [loadingDeleteBreed, setLoadingDeleteBreed] = useState(false)
 
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
                setBreeds([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            let e = JSON.parse(error.message)
            setBreedsMessageType(MessageTypes.ERROR)
            setBreedsMessage(e.message)
            return false
        }

    }

    const handleCreateBreed = async (accessToken, breed) => {
                
        const url = `/api/breeds/${breed.id}`
        const method = APIMethods.POST
        const body = breed

        try {
            setLoadingCreateBreed(true)
            
            let response = await RequestRendler(accessToken, url, method, body, RequestActionType.CREATE_BREED)

            if (response.response?.status === 201) {
                setLoadingCreateBreed(false)
                setBreedsMessageType(MessageTypes.SUCCESS)
                setBreedsMessage(`Espécie criada com sucesso.`)
                setBreeds([...breeds, response.data])
                return response

            } else {
                setLoadingCreateBreed(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setBreedsMessageType(MessageTypes.ERROR)
            setBreedsMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    const handleUpdateBreed = async (accessToken, breed) => {
                
        const url = `/api/breeds/${breed.id}`
        const method = APIMethods.PUT
        const body = breed

        try {
            setLoadingUpdateBreed(true)
            
            let response = await RequestRendler(accessToken, url, method, body, RequestActionType.UPDATE_BREED)

            if (response.response?.status === 200) {
                setLoadingUpdateBreed(false)
                setBreedsMessageType(MessageTypes.SUCCESS)
                setBreedsMessage(`Dados alterados com sucesso.`)
                findOnArrayAndUpdate(breed.id, response.data)
                return response

            } else {
                setLoadingUpdateBreed(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setBreedsMessageType(MessageTypes.ERROR)
            setBreedsMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleDeleteBreed (accessToken, breed) {        
        const url = `/api/breeds/${breed.id}`
        const method = APIMethods.DELETE
        
        try {
            setLoadingDeleteBreed(true)
            
            let response = await RequestRendler(accessToken, url, method, null, RequestActionType.DELETE_BREED)

            if (response.response?.status === 200) {

                setLoadingDeleteBreed(false)
                setBreedsMessageType(MessageTypes.SUCCESS)
                setBreedsMessage(`${breed.breed_name} foi removida com sucesso.`)
                findOnArrayAndUpdate(breed.id, response.data)

                return response

            } else {
                setLoadingDeleteBreed(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setBreedsMessageType(MessageTypes.ERROR)
            setBreedsMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    function findOnArrayAndUpdate (id, data) {
        if (!Object.values(data).length) {
            setBreeds(breeds.filter(e => e.id !== id))
        } else {
            const arr = [...breeds]
            const idx = arr.map(e => e.id).indexOf(id)
            
            arr[idx] = data
            
            setBreeds(arr)
        }
        
    }

    return ( 
        <BreedsContext.Provider
            value={{
                handleGetBreeds,
                handleCreateBreed,
                handleUpdateBreed,
                handleDeleteBreed,
                breeds,
                breedsMessage, setBreedsMessage,
                breedsMessageType, setBreedsMessageType,
                loadingBreeds,
                loadingCreateBreed,
                loadingUpdateBreed,
                loadingDeleteBreed
            }}
        >
            { children }
        </BreedsContext.Provider>
        
    )
}

export default BreedsContext;
