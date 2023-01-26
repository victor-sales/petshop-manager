import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConfirmButton ({onClick, loading, ...props}) {
    return (
        <button 
            id="confirm-button"
            className="bg-blue-500 w-full lg:w-26 h-10 text-white font-semibold rounded-sm hover:bg-blue-600 flex gap-2 items-center justify-center px-2"
            onClick={onClick}>
                {loading ? <FontAwesomeIcon className="h-4 w-4 animate-spin" icon={faSpinner} /> : <></> }
                <span>Confirmar</span>
        </button>
    )
}