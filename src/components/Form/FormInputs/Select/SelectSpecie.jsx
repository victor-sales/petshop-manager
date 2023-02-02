import { useEffect } from "react";
import Select from ".";
import useAuthContext from "../../../../hooks/useAuthContext";
import useSpeciesContext from "../../../../hooks/useSpeciesContext";

export default function SelectSpecie ({value, onChange, ...props}) {

    const { token } = useAuthContext()
    const { handleGetSpecies, species } = useSpeciesContext()
    
    useEffect(() => {
        handleGetSpecies(token)
        //eslint-disable-next-line
    }, [token])
    
    return (
        <Select 
            id='select-specie'
            value={value}
            onChange={onChange}
            labelText="Espécie"
            required
        >
            <option value={""} disabled>...</option>
            {species?.map((e, key) => (
                <option key={key} value={e.id}>{e.specie_name}</option>
            ))}
        </Select>
    )
}