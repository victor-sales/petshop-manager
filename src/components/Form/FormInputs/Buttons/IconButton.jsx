import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton ({iconName, title, onClick, id}) {

    return (
        <button id={id} onClick={onClick} className="flex flex-col justify-center items-center text-blue-600 p-1 ">
            <FontAwesomeIcon className="h-6 w-6" icon={iconName} />
            <span className="text-sm">{title}</span>
        </button>
              
    )
}