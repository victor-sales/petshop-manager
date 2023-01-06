export default function LoginButton (props) {
    const { onClick, text } = props
    return (
        <button 
            type="button" 
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-600 py-1 text-white font-semibold border border-gray-300 rounded-md shadow-md h-10 w-full mt-4">
            {text}
        </button>
    )
}