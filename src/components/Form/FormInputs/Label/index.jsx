export default function Label ({htmlFor, text}) {
    
    return (
        <label
            className="text-gray-700 font-semibold text-sm"
            htmlFor={htmlFor}>
                {text}
        </label>
    )
}