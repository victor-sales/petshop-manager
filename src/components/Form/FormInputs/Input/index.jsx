import Label from "../Label"

export default function Input (props) {
    
    const { id, type, value, onChange, labelText, required } = props
    
    return (
        <div className="flex flex-col">
            <Label htmlFor={id} text={labelText}/>
            <input
                required={required}
                className="border border-gray-300 rounded-md h-8 w-full p-2 outline-1 outline-gray-300 text-sm"
                id={id}
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}