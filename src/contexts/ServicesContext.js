import { createContext, useState } from "react"
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const ServicesContext = createContext()

export function ServicesProvider({children}) {

    const [services, setServices] = useState([])
    const [serviceMessage, setServiceMessage] = useState("")
    const [serviceMessageType, setServiceMessageType] = useState("")
    const [loadingServices, setLoadingServices] = useState(false)
    const [loadingCreateService, setLoadingCreateService] = useState(false)
    const [loadingUpdateService, setLoadingUpdateService] = useState(false)
    const [loadingDeleteService, setLoadingDeleteService] = useState(false)

    async function handleGetServices (accessToken) {
        setLoadingServices(true)

        const url = `/api/services`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)

            if (response.response?.status === 200) {
                setLoadingServices(false)
                setServices(response.data)
                return response.data
            } else {
                setLoadingServices(false)
                setServices([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingServices(false)
            let e = JSON.parse(error.message)
            setServiceMessageType(MessageTypes.ERROR)
            setServiceMessage(e.message)
            return false
        }

    }

    const handleCreateService = async (accessToken, service) => {
                
        const url = `/api/services/${service.id}`
        const method = APIMethods.POST
        const body = service

        try {
            setLoadingCreateService(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.CREATE_SERVICE)

            if (response.response?.status === 201) {
                setLoadingCreateService(false)
                setServiceMessageType(MessageTypes.SUCCESS)
                setServiceMessage(`Serviço criado com sucesso.`)
                setServices([...services, response.data])
                return response

            } else {
                setLoadingCreateService(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setServiceMessageType(MessageTypes.ERROR)
            setServiceMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleUpdateService (accessToken, service) {        
        const url = `/api/services/${service.id}`
        const method = APIMethods.PUT
        const body = service

        try {
            setLoadingUpdateService(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.UPDATE_SERVICE)

            if (response.response?.status === 200) {
                setLoadingUpdateService(false)
                setServiceMessageType(MessageTypes.SUCCESS)
                setServiceMessage(`Dados alterados com sucesso.`)
                findOnArrayAndUpdate(service.id, response.data)
                return response

            } else {
                setLoadingUpdateService(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setServiceMessageType(MessageTypes.ERROR)
            setServiceMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleDeleteService (accessToken, service) {        
        const url = `/api/services/${service.id}`
        const method = APIMethods.DELETE
        
        try {
            setLoadingDeleteService(true)
            
            let response = await RequestHandler(accessToken, url, method, null, RequestActionType.DELETE_SERVICE)

            if (response.response?.status === 200) {

                setLoadingDeleteService(false)
                setServiceMessageType(MessageTypes.SUCCESS)
                setServiceMessage(`${service.service_name} foi removido com sucesso.`)
                findOnArrayAndUpdate(service.id, response.data)

                return response

            } else {
                setLoadingDeleteService(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setServiceMessageType(MessageTypes.ERROR)
            setServiceMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    function findOnArrayAndUpdate (id, data) {
        if (!Object.values(data).length) {
            setServices(services.filter(e => e.id !== id))
        } else {
            const arr = [...services]
            const idx = arr.map(e => e.id).indexOf(id)
            arr[idx] = data
            
            setServices(arr)
        }
        
    }

    return ( 
        <ServicesContext.Provider
            value={{
                handleGetServices,
                handleCreateService,
                handleUpdateService,
                handleDeleteService,
                services,
                serviceMessage, setServiceMessage,
                serviceMessageType, setServiceMessageType,
                loadingServices,
                loadingCreateService,
                loadingUpdateService,
                loadingDeleteService
            }}
        >
            { children }
        </ServicesContext.Provider>
        
    )
}

export default ServicesContext;
