import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import useAuthContext from "../../../../hooks/useAuthContext"
import useSpeciesContext from "../../../../hooks/useSpeciesContext";
import { checkSpecieNameValidity } from "../../../../utils/Helpers";
import Input from "../../FormInputs/Input"

export default function AddSpecieForm ({}) {

    const specieObject = { id: uuid(), specie_name: "", description: "" }

    const { token } = useAuthContext()
    const { handleCreateSpecie } = useSpeciesContext()

    const [specie, setSpecie] = useState(specieObject)
    
    const [specieNameError, setSpecieNameError] = useState("")

    async function createSpecie () {
        
        const nameIsValid = checkSpecieNameValidity(specie.specie_name, setSpecieNameError)

        const areValid = [nameIsValid].every(e => e)

        if (areValid) {
            await handleCreateSpecie(token, specie)
            setSpecie(specieObject)
        } else {
            return false
        } 
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", createSpecie)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", createSpecie)
        }
        //eslint-disable-next-line
    }, [token, specie])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input  
                    labelText="Nome do Espécie*"
                    id="specie-name"
                    required={true}
                    value={specie.specie_name}
                    onChange={(e) => setSpecie({...specie, specie_name: e.target.value})}
                    error={specieNameError}
                    />
                 
                <Input 
                    labelText="Descrição"
                    id="specie-desc"
                    required={true}
                    value={specie.description}
                    onChange={(e) => setSpecie({...specie, description: e.target.value})}  
                />
            </div>
        </form>
    )
}