import { createContext, useState } from "react"
import { APIMethods, DashboardNames, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const DashboardContext = createContext()

export function DashboardProvider({children}) {

    const [lastSells, setLastSells] = useState([])
    const [loadingLastSells, setLoadingLastSells] = useState(false)

    const [scheduleVsConfirmed, setScheduleVsConfirmed] = useState({})
    const [loadingScheduleVsConfirmed, setLoadingScheduleVsConfirmed] = useState(false)

    const [sellsByMonth, setSellsByMonth] = useState([])
    const [loadingSellsByMonth, setLoadingSellsByMonth] = useState(false)

    const [byVet, setByVet] = useState([])
    const [loadingByVet, setLoadingByVet] = useState(false)
    
    const [dashboardMessage, setDashboardMessage] = useState("")
    const [dashboardMessageType, setDashboardMessageType] = useState("")

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
            setDashboardMessageType(MessageTypes.ERROR)
            setDashboardMessage(e.message)
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
            setDashboardMessageType(MessageTypes.ERROR)
            setDashboardMessage(e.message)
            return false
        }

    }

    async function handleGetSellsByMonth (accessToken) {
        setLoadingSellsByMonth(true)

        const url = `/api/dashboard`
        const method = APIMethods.POST
        const body = { dash_name: DashboardNames.SELLS_BY_MONTH }

        try {
            let response = await RequestHandler(accessToken, url, method, body)

            if (response.response?.status === 200) {
                setLoadingSellsByMonth(false)
                setSellsByMonth(response.data.sort((a, b) => a._id.month - b._id.month))
                return response.data
            } else {
                setLoadingSellsByMonth(false)
                setSellsByMonth([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingSellsByMonth(false)
            let e = JSON.parse(error.message)
            setDashboardMessageType(MessageTypes.ERROR)
            setDashboardMessage(e.message)
            return false
        }


    }
    async function handleGetByVet (accessToken) {
        setLoadingByVet(true)

        const url = `/api/dashboard`
        const method = APIMethods.POST
        const body = { dash_name: DashboardNames.VET_ATTEND }

        try {
            let response = await RequestHandler(accessToken, url, method, body)

            if (response.response?.status === 200) {
                setLoadingByVet(false)
                setByVet(response.data.sort((a, b) => a._id.month - b._id.month))
                return response.data
            } else {
                setLoadingByVet(false)
                setByVet([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingByVet(false)
            let e = JSON.parse(error.message)
            setDashboardMessageType(MessageTypes.ERROR)
            setDashboardMessage(e.message)
            return false
        }

    }


    return ( 
        <DashboardContext.Provider
            value={{
                handleGetLastSells,
                handleGetScheduleVsConfirmed,
                handleGetSellsByMonth,
                handleGetByVet,
                lastSells,
                scheduleVsConfirmed,
                sellsByMonth,
                byVet,
                dashboardMessage, setDashboardMessage,
                dashboardMessageType, setDashboardMessageType,
                loadingLastSells,
                loadingScheduleVsConfirmed,
                loadingSellsByMonth,
                loadingByVet
            }}
        >
            { children }
        </DashboardContext.Provider>
        
    )
}

export default DashboardContext;
