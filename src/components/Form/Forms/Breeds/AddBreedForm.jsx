import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import useAuthContext from "../../../../hooks/useAuthContext"
import useBreedsContext from "../../../../hooks/useBreedsContext";
import { checkBreedNameValidity, checkSpecieValidity } from "../../../../utils/Helpers";
import Input from "../../FormInputs/Input"
import SelectSpecie from "../../FormInputs/Select/SelectSpecie";

export default function AddBreedForm ({}) {

    const { token } = useAuthContext()
    const { handleCreateBreed } = useBreedsContext()

    const [breed, setBreed] = useState({ id: uuid(), breed_name: "", specie: {_id: "", name: ""}, description: "" })
    
    const [breedNameError, setBreedNameError] = useState("")
    const [specieError, setSpecieError] = useState("")

    async function createBreed () {
        
        const nameIsValid = checkBreedNameValidity(breed.breed_name, setBreedNameError)
        const specieIsValid = checkSpecieValidity(breed.specie._id, setSpecieError)

        const areValid = [nameIsValid, specieIsValid].every(e => e)

        if (areValid) {
            await handleCreateBreed(token, breed)
        } else {
            return false
        } 
    }

    
    function onChangeSpecie (e) {
        
        const specie_id = e.target.value
        const specie_name = e.target.selectedOptions[0].text

        setBreed({
            ...breed, 
            specie: { _id: specie_id, name: specie_name }
        })
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", createBreed)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", createBreed)
        }
        //eslint-disable-next-line
    }, [token, breed])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input  
                    labelText="Nome da Raça*"
                    id="breed-name"
                    required={true}
                    value={breed.breed_name}
                    onChange={(e) => setBreed({...breed, breed_name: e.target.value})}
                    error={breedNameError}
                    />
                <SelectSpecie 
                    value={breed.specie._id}
                    onChange={onChangeSpecie}
                    error={specieError}
                />
                <Input 
                    labelText="Descrição"
                    id="breed-desc"
                    required={true}
                    value={breed.description}
                    onChange={(e) => setBreed({...breed, description: e.target.value})}  
                />
            </div>
        </form>
    )
}