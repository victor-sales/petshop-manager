import MyScheduleItem from "./MyScheduleItem";

export default function MySchedulesList (props) {
    return (
        <ul className="m-0">
            <MyScheduleItem service="Consulta" date="12/10 14:00" />
            <MyScheduleItem service="Banho e Tosa" date="12/10 15:00" />
            <MyScheduleItem service="Banho e Tosa" date="26/10 14:00" />
        </ul>
    )
   
}