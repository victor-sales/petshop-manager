import { useState } from "react";
import { useEffect } from "react";
import Select from ".";
import useAuthContext from "../../../../hooks/useAuthContext";
import useBreedsContext from "../../../../hooks/useBreedsContext";

export default function SelectBreed ({value, onChange, specieId, ...props}) {

    const { token } = useAuthContext()
    const { handleGetBreeds, breeds } = useBreedsContext()

    const [disabled, setDisabled] = useState(true)
    const [list, setList] = useState([])
    
    useEffect(() => {
        handleGetBreeds(token)
        //eslint-disable-next-line
    }, [token])
    
    useEffect(() => {
        if(specieId) setDisabled(false)
        else setDisabled(true)
    }, [specieId])

    useEffect(() => { 
        if(breeds.length > 0 && specieId) {
            const filtered = breeds.filter(e => e.specie._id === specieId)
            setList(filtered)
        }
    }, [breeds, specieId])

    return (
        <Select 
            id='select-breed'
            value={value}
            onChange={onChange}
            labelText="Raça"
            disabled={disabled}
            required
        >
            <option value={""} disabled>...</option>
            {list?.map((e, key) => (
                <option key={key} value={e.id}>{e.breed_name}</option>
            ))}
        </Select>
    )
}