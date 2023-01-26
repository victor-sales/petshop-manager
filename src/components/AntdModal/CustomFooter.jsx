import BannerMessage from "../BannerMessage/BannerMessage";
import CancelButton from "../Form/FormInputs/Buttons/CancelButton";
import ConfirmButton from "../Form/FormInputs/Buttons/ConfirmButton";

export default function CustomFooter ({message, setMessage, messageType, setMessageType, loading}) {

    return (
        <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="lg:flex-1 text-center w-full lg:w-auto">
                <BannerMessage message={message} setMessage={setMessage} type={messageType} setType={setMessageType} />
            </div>
            <div id="button-wrapper" className="w-full lg:w-auto">
                <ConfirmButton loading={loading}/>
            </div>
        </div>
    )
}   