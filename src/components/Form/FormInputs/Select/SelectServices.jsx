
import Select from ".";
import { Services } from "../../../../utils/Enums";
import { capitalizeFirst } from "../../../../utils/Helpers";

export default function SelectService ({value, onChange, error, ...props}) {

    return (
        <Select 
            id='select-service'
            value={value}
            onChange={onChange}
            labelText="Serviço*"
            required
            error={error}
        >
            <option value={""} disabled>...</option>
            {Object.values(Services).map((e, key) => <option key={key} value={e}>{capitalizeFirst(e)}</option> )}
        </Select>
    )
}