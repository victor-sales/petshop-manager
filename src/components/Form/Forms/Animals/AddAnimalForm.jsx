import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import useAnimalsContext from "../../../../hooks/useAnimalsContext"
import useAuthContext from "../../../../hooks/useAuthContext"
import useUsersContext from "../../../../hooks/useUsersContext"
import NormalizedAnimal from "../../../../utils/NormalizedAnimal"
import Input from "../../FormInputs/Input"
import SelectBreed from "../../FormInputs/Select/SelectBreed"
import SelectSpecie from "../../FormInputs/Select/SelectSpecie"
import SelectUser from "../../FormInputs/Select/SelectUser"

export default function AddAnimalForm ({animals, setAnimals}) {

    // const [animalName, setAnimalName] = useState("")
    // const [tutor, setTutor] = useState("")
    // const [breed, setBreed] = useState("")
    // const [specie, setSpecie] = useState("")
    // const [desc, setDesc] = useState("")
    const { token } = useAuthContext()
    const { handleCreateAnimal } = useAnimalsContext()

    const [animal, setAnimal] = useState({ id: uuid(), animal_name: "",  tutor: { _id: "", name: "" },  breed: { _id: "", name: "" },  specie: { _id: "", name: "" },  description: "" })

    async function createAnimal () {
        await handleCreateAnimal(token, animal)
    }

    function onChangeTutor (e) {
        
        const user_id = e.target.value
        const user_name = e.target.selectedOptions[0].text

        setAnimal({
            ...animal, 
            tutor: { id: user_id, name: user_name }
        })
    }

    function onChangeSpecie (e) {
        
        const specie_id = e.target.value
        const specie_name = e.target.selectedOptions[0].text

        setAnimal({
            ...animal, 
            specie: { id: specie_id, name: specie_name }
        })
    }

    function onChangeBreed (e) {
        
        const breed_id = e.target.value
        const breed_name = e.target.selectedOptions[0].text

        setAnimal({
            ...animal, 
            breed: { id: breed_id, name: breed_name }
        })
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", createAnimal)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", createAnimal)
        }
        //eslint-disable-next-line
    }, [token, animal])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input  
                    labelText="Nome do animal"
                    id="animal-name"
                    required={true}
                    value={animal.animal_name}
                    onChange={(e) => setAnimal({...animal, animal_name: e.target.value})}
                    error=""
                    />
                 
                <SelectUser 
                    value={animal.tutor.id}
                    onChange={onChangeTutor}
                />
                <SelectSpecie 
                     value={animal.specie.id}
                     onChange={onChangeSpecie}
                    />
                <SelectBreed
                    value={animal.breed.id}
                    onChange={onChangeBreed}
                    specieId={animal.specie.id}
                />
                <Input 
                    labelText="Descrição"
                    id="animal-desc"
                    required={true}
                    value={animal.description}
                    onChange={(e) => setAnimal({...animal, description: e.target.value})}
                    error=""
                />
            </div>
        </form>
    )
}