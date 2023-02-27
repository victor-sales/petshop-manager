
import Layout from "../components/Layout";
import ScheduleForm from "../components/Form/Forms/ScheduleForm";
import MySchedules from "../components/MySchedules";

export default function Agendamento (props) {

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 mx-2 lg:mx-0 w-full">
                <MySchedules />
                <ScheduleForm />
            </div>
        </Layout>
    )
}