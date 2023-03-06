import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AccessDenied ({}) {
    return (
        <div className="absolute left-1/2 top-1/2">
            <div className="relative -left-1/2">
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon className="h-8 w-8" icon={faLock} />
                    <span className="text-lg">Acesso negado</span>
                </div>
            </div>
        </div>
    )
}