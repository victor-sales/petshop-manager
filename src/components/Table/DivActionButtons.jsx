import { faArrowsRotate, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../Form/FormInputs/Buttons/IconButton";

export default function DivActionButtons ({onClickNew, onClickUpdate, ...props}) {
    return (
        <div className="w-full flex flex-row-reverse px-2 gap-2">
            {props.extra ?? <></>}
            <IconButton id={"new-item"} iconName={faPlusCircle} title="Novo" onClick={onClickNew}/>
            <IconButton id={"refresh-items"} iconName={faArrowsRotate} title="Atualizar" onClick={onClickUpdate}/>
        </div>
    )
}