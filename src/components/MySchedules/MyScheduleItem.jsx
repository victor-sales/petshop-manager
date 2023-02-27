import { format } from "date-fns"

export default function MyScheduleItem (props) {
    
    const { service, date } = props

    return (
        <li className="mb-2">
            <span className="text-sm font-bold mr-2">{`[${format(new Date(date), 'dd/MM/yy HH:mm')}]`}</span>
            <span className="text-sm">{service}</span>
        </li>
    )
}