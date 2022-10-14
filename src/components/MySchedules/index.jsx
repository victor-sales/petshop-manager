import MySchedulesList from "./MySchedulesList";
import MySchedulesTitle from "./MySchedulesTitle";

export default function MySchedules () {
    return (
        <section className="lg:col-start-2 border border-gray-300 rounded bg-white shadow-md px-2 py-6">
            <MySchedulesTitle />
            <MySchedulesList />
        </section>
    )
}