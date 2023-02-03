import Label from "../Label"
import SpanError from "../SpanError"

export default function Input ({id, type, value, onChange, labelText, required, onBlur, onFocus, error, readOnly, disabled }) {
        
    return (
        <div className="flex flex-col w-full mb-1">
            <Label htmlFor={id} text={labelText}/>
            <input
                required={required}
                className="border border-gray-300 rounded-md h-8 w-full p-2 outline-1 outline-gray-300 text-sm disabled:bg-gray-200"
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                readOnly={readOnly}
                disabled={disabled}
            />
            <SpanError error={error} />
        </div>
    )
}