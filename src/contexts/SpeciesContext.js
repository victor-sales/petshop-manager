import { createContext, useState } from "react"
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";
import RequestRendler from "../utils/RequestHandler";

const SpeciesContext = createContext()

export function SpeciesProvider({children}) {

    const [species, setSpecies] = useState([])
    const [speciesMessage, setSpeciesMessage] = useState("")
    const [speciesMessageType, setSpeciesMessageType] = useState("")
    const [loadingSpecies, setLoadingSpecies] = useState(false)
    const [loadingCreateSpecie, setLoadingCreateSpecie] = useState(false)
    const [loadingUpdateSpecie, setLoadingUpdateSpecie] = useState(false)
    const [loadingDeleteSpecie, setLoadingDeleteSpecie] = useState(false)
 
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
                setSpecies([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            let e = JSON.parse(error.message)
            setSpeciesMessageType(MessageTypes.ERROR)
            setSpeciesMessage(e.message)
            return false
        }

    }

    const handleCreateSpecie = async (accessToken, specie) => {
                
        const url = `/api/species/${specie.id}`
        const method = APIMethods.POST
        const body = specie

        try {
            setLoadingCreateSpecie(true)
            
            let response = await RequestRendler(accessToken, url, method, body, RequestActionType.CREATE_SPECIE)

            if (response.response?.status === 201) {
                setLoadingCreateSpecie(false)
                setSpeciesMessageType(MessageTypes.SUCCESS)
                setSpeciesMessage(`Espécie criada com sucesso.`)
                setSpecies([...species, response.data])
                return response

            } else {
                setLoadingCreateSpecie(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setSpeciesMessageType(MessageTypes.ERROR)
            setSpeciesMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    const handleUpdateSpecie = async (accessToken, specie) => {
                
        const url = `/api/species/${specie.id}`
        const method = APIMethods.PUT
        const body = specie

        try {
            setLoadingUpdateSpecie(true)
            
            let response = await RequestRendler(accessToken, url, method, body, RequestActionType.UPDATE_SPECIE)

            if (response.response?.status === 200) {
                setLoadingUpdateSpecie(false)
                setSpeciesMessageType(MessageTypes.SUCCESS)
                setSpeciesMessage(`Dados alterados com sucesso.`)
                findOnArrayAndUpdate(specie.id, response.data)
                return response

            } else {
                setLoadingUpdateSpecie(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setSpeciesMessageType(MessageTypes.ERROR)
            setSpeciesMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleDeleteSpecie (accessToken, specie) {        
        const url = `/api/species/${specie.id}`
        const method = APIMethods.DELETE
        
        try {
            setLoadingDeleteSpecie(true)
            
            let response = await RequestRendler(accessToken, url, method, null, RequestActionType.DELETE_ANIMAL)

            if (response.response?.status === 200) {

                setLoadingDeleteSpecie(false)
                setSpeciesMessageType(MessageTypes.SUCCESS)
                setSpeciesMessage(`${specie.specie_name} foi removida com sucesso.`)
                findOnArrayAndUpdate(specie.id, response.data)

                return response

            } else {
                setLoadingDeleteSpecie(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setSpeciesMessageType(MessageTypes.ERROR)
            setSpeciesMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    function findOnArrayAndUpdate (id, data) {
        if (!Object.values(data).length) {
            setSpecies(species.filter(e => e.id !== id))
        } else {
            const arr = species
            const idx = arr.map(e => e.id).indexOf(id)
            
            arr[idx] = data
            
            setSpecies(arr)
        }
        
    }

    return ( 
        <SpeciesContext.Provider
            value={{
                handleGetSpecies,
                handleCreateSpecie,
                handleUpdateSpecie,
                handleDeleteSpecie,
                species,
                speciesMessage, setSpeciesMessage,
                speciesMessageType, setSpeciesMessageType,
                loadingSpecies,
                loadingCreateSpecie,
                loadingUpdateSpecie,
                loadingDeleteSpecie
            }}
        >
            { children }
        </SpeciesContext.Provider>
        
    )
}

export default SpeciesContext;
