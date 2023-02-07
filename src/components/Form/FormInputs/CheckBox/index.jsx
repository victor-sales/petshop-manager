import Label from "../Label";

export default function CheckBox ({id, checked, name, label, onChange}) {

    return (
        <div className="flex gap-2">
            <input 
                type="checkbox" 
                name={name} 
                id={id} 
                checked={checked}
                onChange={onChange}/>   
            <Label htmlFor={id} text={label}/>
        </div>

    )
}