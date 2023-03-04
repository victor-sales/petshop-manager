import ReactDatePicker, { registerLocale } from "react-datepicker";
import Label from "../Label";
import ptBr from "date-fns/locale/pt-BR"
import { getDay } from "date-fns";
import SpanError from "../SpanError";
registerLocale("ptBr", ptBr)

export default function SellDatePicker ({id, date, setDate, error}) {

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };
    
    return (
        <div className="flex flex-col w-full mb-1">
            <Label htmlFor={id} text={"Data*"}/>
            <ReactDatePicker 
                className="border border-gray-300 rounded-md outline-gray-300 w-full h-9 p-2" 
                locale={"ptBr"}
                maxDate={new Date()}
                selected={date}
                showTimeInput
                timeCaption="Hora"
                timeFormat="p"
                dateFormat={"Pp"}
                filterDate={isWeekday}
                onChange={(date) => setDate(date)} />
            <SpanError error={error} />
        </div>
    );
}