import { createContext, useState } from "react"
import { APIMethods, DashboardNames, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const DashboardContext = createContext()

export function DashboardProvider({children}) {

    const [lastSells, setLastSells] = useState([])
    const [loadingLastSells, setLoadingLastSells] = useState(false)

    const [scheduleVsConfirmed, setScheduleVsConfirmed] = useState({})
    const [loadingScheduleVsConfirmed, setLoadingScheduleVsConfirmed] = useState(false)
    
    const [dashboardMessage, setAnimalMessage] = useState("")
    const [dashboardMessageType, setAnimalMessageType] = useState("")

    async function handleGetLastSells (accessToken) {
        setLoadingLastSells(true)

        const url = `/api/dashboard`
        const method = APIMethods.POST
        const body = { dash_name: DashboardNames.LAST_SELLS }

        try {
            let response = await RequestHandler(accessToken, url, method, body)

            if (response.response?.status === 200) {
                setLoadingLastSells(false)
                setLastSells(response.data)
                return response.data
            } else {
                setLoadingLastSells(false)
                setLastSells([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingLastSells(false)
            let e = JSON.parse(error.message)
            setAnimalMessageType(MessageTypes.ERROR)
            setAnimalMessage(e.message)
            return false
        }

    }

    async function handleGetScheduleVsConfirmed (accessToken) {
        setLoadingScheduleVsConfirmed(true)

        const url = `/api/dashboard`
        const method = APIMethods.POST
        const body = { dash_name: DashboardNames.SCHEDULED_VS_CONFIRMED }

        try {
            let response = await RequestHandler(accessToken, url, method, body)

            if (response.response?.status === 200) {
                setLoadingScheduleVsConfirmed(false)
                setScheduleVsConfirmed(response.data)
                return response.data
            } else {
                setLoadingScheduleVsConfirmed(false)
                setScheduleVsConfirmed([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingScheduleVsConfirmed(false)
            let e = JSON.parse(error.message)
            setAnimalMessageType(MessageTypes.ERROR)
            setAnimalMessage(e.message)
            return false
        }

    }


    return ( 
        <DashboardContext.Provider
            value={{
                handleGetLastSells,
                handleGetScheduleVsConfirmed,
                lastSells,
                scheduleVsConfirmed,
                dashboardMessage, setAnimalMessage,
                dashboardMessageType, setAnimalMessageType,
                loadingLastSells,
                loadingScheduleVsConfirmed
            }}
        >
            { children }
        </DashboardContext.Provider>
        
    )
}

export default DashboardContext;
