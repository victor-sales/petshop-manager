import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useEffect } from "react"
import ConsultationByVet from "../components/Charts/ConsultationByVet"
import LastSells from "../components/Charts/LastSells"
import ScheduledServices from "../components/Charts/ScheduledServices"
import SellsByMonth from "../components/Charts/SellsByMonth"
import ServicesByMonth from "../components/Charts/ServicesByMonth"
import Layout from "../components/Layout"
import useDashboardContext from "../hooks/useDashboardContext"

export default function Home() {

    const { loadingLastSells, loadingScheduleVsConfirmed, loadingSellsByMonth, loadingByVet } = useDashboardContext()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const arr = [loadingLastSells, loadingScheduleVsConfirmed, loadingSellsByMonth, loadingByVet]
        setLoading(!arr.every(e => !e))

    }, [loadingLastSells, loadingScheduleVsConfirmed, loadingSellsByMonth, loadingByVet])


    function handleUpdateAll () {
        document.getElementById("sells-by-month")?.click()
        document.getElementById("services-by-month")?.click()
        document.getElementById("by-vet")?.click()
        document.getElementById("last-sells")?.click()
        document.getElementById("not-vs-confirmed")?.click()
    }
    
    return (
        <Layout>
            <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 px-2 lg:px-0">
                <div className="md:col-span-6 lg:col-span-10 lg:col-start-2 mb-2  w-full h-auto">
                    <div className="rounded-md bg-white mb-1 border border-gray-400 flex justify-end py-1 px-2">
                        <button id={"update-all"} className="flex gap-2 items-center" disabled={loading} onClick={handleUpdateAll}>
                            <span>Atualizar todos</span>
                            <FontAwesomeIcon className={`h-4 w-4 ${loading ? "animate-spin" : "animate-none"}`} icon={faRefresh} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        <SellsByMonth />
                        <ServicesByMonth />
                        <ScheduledServices />
                        <ConsultationByVet />
                        <LastSells />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
