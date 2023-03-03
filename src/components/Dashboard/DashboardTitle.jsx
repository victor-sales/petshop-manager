import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardTitle ({title, id, loading}) {
    return (
        <div className="flex items-center justify-center border-b border-gray-400 p-2">
            <span className="flex-1 text-center text-[14px] font-bold text-gray-800">{title}</span>
            <button id={id} className="" disabled={loading}>
                <FontAwesomeIcon className={`h-4 w-4 ${loading ? "animate-spin" : "animate-none"}`} icon={faRefresh} />
            </button>
               
        </div>
    )
}