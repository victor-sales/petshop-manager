export default function Label (props) {
    
    const { htmlFor, text } = props

    return (
        <label
            className="text-gray-700 font-semibold text-sm"
            htmlFor={htmlFor}>
                {text}
        </label>
    )
}