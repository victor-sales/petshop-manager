import ReactDatePicker, { registerLocale } from "react-datepicker";
import Label from "../Label";
import ptBr from "date-fns/locale/pt-BR"
import { getDay } from "date-fns";
import { useEffect, useState } from "react";
import SpanError from "../SpanError";
registerLocale("ptBr", ptBr)

export default function DatePicker (props) {
    const { id, date, setDate, error } = props

    const [times, setTimes] = useState([])

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };

    const excludedTimes = () => {
        let dates = []
        
        for (let i = 0; i < 24; i++) {
            if (i < 8 || i > 17) {
                dates.push(new Date().setHours(i, 0, 0, 0))
                dates.push(new Date().setHours(i, 30, 0, 0))
            }
        }

        return dates
    }

    useEffect(() => {
        const t = excludedTimes()
        setTimes(t)
    }, [])

    return (
        <div className="flex flex-col w-full mb-1">
            <Label htmlFor={id} text={"Data*"}/>
            <ReactDatePicker 
                className="border border-gray-300 rounded-md outline-gray-300 w-full h-9 p-2" 
                locale={"ptBr"}
                minDate={new Date()}
                selected={date}
                showTimeSelect
                timeCaption="Hora"
                timeFormat="p"
                dateFormat={"Pp"}
                filterDate={isWeekday}
                excludeTimes={times}
                onChange={(date) => setDate(date)} />
            <SpanError error={error} />
        </div>
    );
}