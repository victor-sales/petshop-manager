export default function SocialMediaLoginButton (props) {
    const { onClick, socialMediaName, socialMediaIcon } = props
    return (
        <button 
            type="button" 
            onClick={onClick}
            className="bg-white hover:bg-gray-50 py-1 text-sm text-gray-900 font-semibold border border-gray-300 rounded-md shadow-md h-8 w-full flex items-center justify-center gap-4">
            { socialMediaIcon }
            <span>Entrar com {socialMediaName}</span>
        </button>
    )
}