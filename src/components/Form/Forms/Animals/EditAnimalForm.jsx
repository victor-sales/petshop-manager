import { useEffect } from "react"
import { useState } from "react"
import useAnimalsContext from "../../../../hooks/useAnimalsContext"
import useAuthContext from "../../../../hooks/useAuthContext"
import { checkAnimalNameValidity, checkBreedValidity, checkSpecieValidity, checkTutorValidity } from "../../../../utils/Helpers"
import Input from "../../FormInputs/Input"
import SelectBreed from "../../FormInputs/Select/SelectBreed"
import SelectSpecie from "../../FormInputs/Select/SelectSpecie"
import SelectUser from "../../FormInputs/Select/SelectUser"

export default function EditAnimalForm ({animal, setAnimal}) {
    const { token } = useAuthContext()
    const { handleUpdateAnimal } = useAnimalsContext()
    
    const [animalNameError, setAnimalNameError] = useState("")
    const [tutorError, setTutorError] = useState("")
    const [breedError, setBreedError] = useState("")
    const [specieError, setSpecieError] = useState("")

    async function updateAnimal () {
        
        const nameIsValid = checkAnimalNameValidity(animal.animal_name, setAnimalNameError)
        const tutorIsValid = checkTutorValidity(animal.tutor._id, setTutorError)
        const specieIsValid = checkSpecieValidity(animal.specie._id, setSpecieError)
        const breedIsValid = checkBreedValidity(animal.breed._id, setBreedError)

        const areValid = [, nameIsValid, tutorIsValid, specieIsValid, breedIsValid].every(e => e)

        if (areValid) {
            await handleUpdateAnimal(token, animal)
        } else {
            return false
        } 
    }

    function onChangeTutor (e) {
        
        const user_id = e.target.value
        const user_name = e.target.selectedOptions[0].text

        setAnimal({
            ...animal, 
            tutor: { _id: user_id, name: user_name }
        })
    }

    function onChangeSpecie (e) {
        
        const specie_id = e.target.value
        const specie_name = e.target.selectedOptions[0].text

        setAnimal({
            ...animal, 
            specie: { _id: specie_id, name: specie_name }
        })
    }

    function onChangeBreed (e) {
        
        const breed_id = e.target.value
        const breed_name = e.target.selectedOptions[0].text

        setAnimal({
            ...animal, 
            breed: { _id: breed_id, name: breed_name }
        })
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", updateAnimal)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", updateAnimal)
        }
        //eslint-disable-next-line
    }, [token, animal])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input  
                    labelText="Nome do animal*"
                    id="animal-name"
                    required={true}
                    value={animal.animal_name}
                    onChange={(e) => setAnimal({...animal, animal_name: e.target.value})}
                    error={animalNameError}
                    />
                 
                <SelectUser 
                    value={animal.tutor._id}
                    onChange={onChangeTutor}
                    error={tutorError}
                />
                <SelectSpecie 
                    value={animal.specie._id}
                    onChange={onChangeSpecie}
                    error={specieError}
                />
                <SelectBreed
                    value={animal.breed._id}
                    onChange={onChangeBreed}
                    specieId={animal.specie._id}
                    error={breedError}
                />
                <Input 
                    labelText="Descrição"
                    id="animal-desc"
                    required={true}
                    value={animal.description}
                    onChange={(e) => setAnimal({...animal, description: e.target.value})}  
                />
            </div>
        </form>
    )
}