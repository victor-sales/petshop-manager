import Label from "../Label";
import Input from 'react-phone-number-input/input'

export default function InputPhoneNumber({value, setValue, id, error, labelText}) {
    return (
        <div className="flex flex-col w-full mb-2">
            <Label htmlFor={id} text={labelText}/>
            <Input
                maxLength={15}
                country="BR"
                className={"border border-gray-300 rounded-md h-8 w-full p-2 outline-1 outline-gray-300 text-sm"}
                id={id}
                placeholder=""
                value={value}
                onChange={setValue}
            />
            {error ? <span className="pt-0.5 text-xs text-red-500 font-semibold">{error}</span> : <></>}
        </div>
    )
}