import Label from "../Label"

export default function Select ({id, value, onChange, labelText, required, children, disabled, error}) {

    return (
        <>
            <Label htmlFor={id} text={labelText} />
            <select
                className="border border-gray-300 rounded-md h-9 px-2 w-full outline-1 outline-gray-300 text-sm"
                required={required}
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {children}
            </select>
            <span className="pt-0.5 text-xs text-red-500 font-semibold">{error}</span>
        </>
    )
}