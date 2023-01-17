import { useEffect, useState } from "react"
import { MessageTypes } from "../../utils/Enums";

export default function BannerMessage ({type, setType, message, setMessage}) {
    
    const [bgColor, setBgColor] = useState("")
    const [textColor, setTextColor] = useState("")

    function handleBannerColor () {
        switch (type) {
            case MessageTypes.ERROR:
                setBgColor("bg-red-300")
                setTextColor("text-red-800")
                break;
            case MessageTypes.SUCCESS: 
                setBgColor("bg-green-300")
                setTextColor("text-green-800")
                break
            default:
                setBgColor("bg-blue-300")
                setTextColor("text-blue-800")
                break;
        }
    }
    
    useEffect(() => {
        handleBannerColor()
        //eslint-disable-next-line
    }, [message])
    
    return (
        message ? 
            <div className={`flex items-center rounded-sm ${bgColor}`}>
                <div className={`flex-1 flex justify-center`}>
                    <span className={`text-xs font-semibold ${textColor} py-2 px-2`}>{message}</span>
                </div>
                <button className="pr-4 py-2" onClick={() => { setType(""); setMessage("")} }>x</button>
            </div> :
            <></>
    )
}