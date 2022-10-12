import Label from "../Label"

export default function Textarea (props) {

    const { name, id, labelText} = props

    return (
        <>
            <Label htmlFor={id} text={labelText}/>
            <textarea className="border border-gray-300 rounded-md w-full p-2 text-xs outline-gray-300" name={name} id={id} cols="30" rows="3"></textarea>
        </>
        
    )
}