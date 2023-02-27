import { createContext, useEffect, useState } from "react"
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const UserScheduleContext = createContext()

export function UserScheduleProvider({children}) {

    const [userSchedules, setUserSchedules] = useState([])
    const [userScheduleMessage, setUserScheduleMessage] = useState("")
    const [userScheduleMessageType, setUserScheduleMessageType] = useState("")
    const [loadingUserSchedule, setLoadingUserSchedule] = useState(false)
    const [loadingCreateUserSchedule, setLoadingCreateUserSchedule] = useState(false)


    async function handleGetUserSchedules (accessToken) {
        setLoadingUserSchedule(true)

        const url = `/api/user_schedule`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)
            if (response.response?.status === 200) {
                setLoadingUserSchedule(false)
                setUserSchedules(response.data)
                return response.data
            } else {
                setLoadingUserSchedule(false)
                setUserSchedules([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingUserSchedule(false)
            let e = JSON.parse(error.message)
            setUserScheduleMessageType(MessageTypes.ERROR)
            setUserScheduleMessage(e.message)
            return false
        }

    }

    const handleCreateUserSchedule = async (accessToken, service) => {
        
        const url = `/api/user_schedule/${service.id}`
        const method = APIMethods.POST
        const body = service

        try {
            setLoadingCreateUserSchedule(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.CREATE_SERVICE)

            if (response.response?.status === 201) {
                setLoadingCreateUserSchedule(false)
                setUserSchedules([...userSchedules, response.data])
                setUserScheduleMessageType(MessageTypes.SUCCESS)
                setUserScheduleMessage("Agendamento efetuado com sucesso")

                return response

            } else {
                setLoadingCreateUserSchedule(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setUserScheduleMessageType(MessageTypes.ERROR)
            setUserScheduleMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    return ( 
        <UserScheduleContext.Provider
            value={{
                handleGetUserSchedules,
                handleCreateUserSchedule,
                userSchedules,
                userScheduleMessage, setUserScheduleMessage,
                userScheduleMessageType, setUserScheduleMessageType,
                loadingUserSchedule,
                loadingCreateUserSchedule,
            }}
        >
            { children }
        </UserScheduleContext.Provider>
        
    )
}

export default UserScheduleContext;
