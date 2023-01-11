export default function LoginButton ({text, disabled, onClick}) {

    return (
        <button 
            disabled={disabled}
            type="button" 
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-600 py-1 text-white font-semibold border border-gray-300 rounded-md shadow-md h-10 w-full disabled:bg-gray-300 disabled:text-black">
            {text}
        </button>
    )
}