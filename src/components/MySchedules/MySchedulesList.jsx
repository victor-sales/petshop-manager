import { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import useUserScheduleContext from "../../hooks/useUserScheduleContext";
import MyScheduleItem from "./MyScheduleItem";

export default function MySchedulesList (props) {

    const { handleGetUserSchedules, userSchedules } = useUserScheduleContext()
    const { token } = useAuthContext()

    useEffect(() => {
        async function list () {
            await handleGetUserSchedules(token)
        }

        if (token) list()
        
        //eslint-disable-next-line
    }, [token])

    return (
        <ul className="m-0 lg:max-h-96 max-h-48 overflow-auto">
            {userSchedules.length ? 
                userSchedules?.map((e, key) => <MyScheduleItem key={key} service={e.service_name} date={e.date} />) :
                <p>Você não possui nenhum serviço agendado.</p>
            }
        </ul>
    )
   
}