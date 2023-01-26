import Label from "../Label"

export default function Select ({id, value, onChange, labelText, required, children}) {

    return (
        <>
            <Label htmlFor={id} text={labelText} />
            <select
                className="border border-gray-300 rounded-md h-9 px-2 w-full outline-1 outline-gray-300 text-sm"
                required={required}
                id={id}
                value={value}
                onChange={onChange}
            >
                {children}
            </select>
        </>
    )
}