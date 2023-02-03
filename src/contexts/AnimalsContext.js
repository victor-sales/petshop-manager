import { createContext, useState } from "react"
import { v4 as uuid } from 'uuid';
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";
import RequestRendler from "../utils/RequestHandler";

const AnimalsContext = createContext()

export function AnimalsProvider({children}) {

    const [animals, setAnimals] = useState([])
    const [animalMessage, setAnimalMessage] = useState("")
    const [animalMessageType, setAnimalMessageType] = useState("")
    const [loadingAnimals, setLoadingAnimals] = useState(false)
    const [loadingCreateAnimal, setLoadingCreateAnimal] = useState(false)
    const [loadingUpdateAnimal, setLoadingUpdateAnimal] = useState(false)
    const [loadingDeleteAnimal, setLoadingDeleteAnimal] = useState(false)

    async function handleGetAnimals (accessToken) {
        setLoadingAnimals(true)

        const url = `/api/animals`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)

            if (response.response?.status === 200) {
                setLoadingAnimals(false)
                setAnimals(response.data)
                return response.data
            } else {
                setLoadingAnimals(false)
                setAnimals([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingAnimals(false)
            let e = JSON.parse(error.message)
            setAnimalMessageType(MessageTypes.ERROR)
            setAnimalMessage(e.message)
            return false
        }

    }

    const handleCreateAnimal = async (accessToken, animal) => {
                
        const url = `/api/animals/${animal.id}`
        const method = APIMethods.POST
        const body = animal

        try {
            setLoadingCreateAnimal(true)
            
            let response = await RequestRendler(accessToken, url, method, body, RequestActionType.CREATE_ANIMAL)

            if (response.response?.status === 201) {
                setLoadingCreateAnimal(false)
                setAnimalMessageType(MessageTypes.SUCCESS)
                setAnimalMessage(`Animal criado com sucesso.`)
                setAnimals([...animals, response.data])
                return response

            } else {
                setLoadingCreateAnimal(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setAnimalMessageType(MessageTypes.ERROR)
            setAnimalMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleUpdateAnimal (accessToken, animal) {        
        const url = `/api/animals/${animal.id}`
        const method = APIMethods.PUT
        const body = animal

        try {
            setLoadingUpdateAnimal(true)
            
            let response = await RequestRendler(accessToken, url, method, body, RequestActionType.UPDATE_ANIMAL)

            if (response.response?.status === 200) {
                setLoadingUpdateAnimal(false)
                setAnimalMessageType(MessageTypes.SUCCESS)
                setAnimalMessage(`Dados alterados com sucesso.`)
                findOnArrayAndUpdate(animal.id, response.data)
                return response

            } else {
                setLoadingUpdateAnimal(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setAnimalMessageType(MessageTypes.ERROR)
            setAnimalMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleDeleteAnimal (accessToken, animal) {        
        const url = `/api/animals/${animal.id}`
        const method = APIMethods.DELETE
        
        try {
            setLoadingDeleteAnimal(true)
            
            let response = await RequestRendler(accessToken, url, method, null, RequestActionType.DELETE_ANIMAL)

            if (response.response?.status === 200) {

                setLoadingDeleteAnimal(false)
                setAnimalMessageType(MessageTypes.SUCCESS)
                setAnimalMessage(`${animal.animal_name} foi removido com sucesso.`)
                findOnArrayAndUpdate(animal.id, response.data)

                return response

            } else {
                setLoadingDeleteAnimal(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setAnimalMessageType(MessageTypes.ERROR)
            setAnimalMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    function findOnArrayAndUpdate (id, data) {
        if (!data.length) {
            setAnimals(animals.filter(e => e.id !== id))
        } else {
            const arr = animals
            const idx = arr.map(e => e.id).indexOf(id)
            
            arr[idx] = data
            
            setAnimals(arr)
        }
        
    }

    return ( 
        <AnimalsContext.Provider
            value={{
                handleGetAnimals,
                handleCreateAnimal,
                handleUpdateAnimal,
                handleDeleteAnimal,
                animals,
                animalMessage, setAnimalMessage,
                animalMessageType, setAnimalMessageType,
                loadingAnimals,
                loadingCreateAnimal,
                loadingUpdateAnimal,
                loadingDeleteAnimal
            }}
        >
            { children }
        </AnimalsContext.Provider>
        
    )
}

export default AnimalsContext;
