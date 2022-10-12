import ReactDatePicker, { registerLocale } from "react-datepicker";
import Label from "../Label";
import ptBr from "date-fns/locale/pt-BR"
registerLocale("ptBr", ptBr)

export default function DatePicker (props) {
    const { id, date, setDate } = props

    return (
        <>
            <Label htmlFor={id} text={"Data"}/>
            <ReactDatePicker 
                className="border border-gray-300 rounded-md outline-gray-300 w-full h-9 p-2" 
                locale={"ptBr"}
                dateFormat="dd/MM/yyyy"
                minDate={date}
                selected={date} 
                onChange={(date) => setDate(date)} />
        </>
    );
}