import useUserAccountContext from "../../hooks/useUserAccountContext";
import MySchedulesList from "./MySchedulesList";
import MySchedulesTitle from "./MySchedulesTitle";

export default function MySchedules () {
    const { userAccount } = useUserAccountContext()
    
    return (
        <section className="lg:col-start-2 border border-gray-300 rounded bg-white shadow-md px-2 py-6">
            <p className="pb-3 border-b border-gray-400">Olá, <span className="font-bold">{userAccount?.user_name}</span></p>
            <MySchedulesTitle />
            <MySchedulesList />
        </section>
    )
}