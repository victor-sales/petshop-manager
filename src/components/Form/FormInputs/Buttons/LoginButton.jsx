export default function LoginButton (props) {
    const { onClick } = props
    return (
        <button 
            type="submit" 
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-600 py-1 text-white font-semibold border border-gray-300 rounded-md shadow-md h-10 w-full mt-4">
            Entrar
        </button>
    )
}