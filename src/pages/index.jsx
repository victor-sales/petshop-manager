import ConsultationByVet from "../components/Charts/ConsultationByVet"
import LastSells from "../components/Charts/LastSells"
import ScheduledServices from "../components/Charts/ScheduledServices"
import SellsByMonth from "../components/Charts/SellsByMonth"
import Container from "../components/Container"
import Layout from "../components/Layout"

export default function Home() {

  return (
    <>
        <Layout>
          <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 px-2 md:px-0">
            <div className="md:col-span-4 md:col-start-2 lg:col-span-10 lg:col-start-2 mb-2  w-full h-auto">
              <div className="grid grid-cols-2 gap-1">
                <SellsByMonth />
                <ScheduledServices />
                <ConsultationByVet />
                <LastSells />
              </div>
            </div>
          </div>
  
        </Layout>
    </>
  )
}
