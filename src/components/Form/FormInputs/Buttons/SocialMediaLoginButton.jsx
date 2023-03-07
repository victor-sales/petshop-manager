import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialMediaLoginButton ({onClick, socialMediaName, socialMediaIcon}) {

    return (
        <button 
            type="button" 
            onClick={onClick}
            className="bg-white hover:bg-gray-50 py-1 text-sm text-gray-900 font-semibold border border-gray-300 rounded-md shadow-md h-8 w-full flex items-center justify-center gap-4">
            <FontAwesomeIcon className="h-4 w-4" icon={socialMediaIcon} />
            <span>Entrar com {socialMediaName}</span>
        </button>
    )
}