import Label from "../Label"

export default function Input ({id, type, value, onChange, labelText, required, onBlur, onFocus, error }) {
        
    return (
        <div className="flex flex-col w-full mb-2">
            <Label htmlFor={id} text={labelText}/>
            <input
                required={required}
                className="border border-gray-300 rounded-md h-8 w-full p-2 outline-1 outline-gray-300 text-sm"
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            {error ? <span className="pt-0.5 text-xs text-red-500 font-semibold">{error}</span> : <></>}
        </div>
    )
}