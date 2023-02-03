import { useEffect } from "react"
import { useState } from "react"
import useAnimalsContext from "../../../../hooks/useAnimalsContext"
import useAuthContext from "../../../../hooks/useAuthContext"
import { checkAnimalNameValidity, checkBreedValidity, checkSpecieValidity, checkTutorValidity } from "../../../../utils/Helpers"
import Input from "../../FormInputs/Input"
import SelectBreed from "../../FormInputs/Select/SelectBreed"
import SelectSpecie from "../../FormInputs/Select/SelectSpecie"
import SelectUser from "../../FormInputs/Select/SelectUser"

export default function RemoveAnimalForm ({animal}) {
    const { token } = useAuthContext()
    const { handleDeleteAnimal } = useAnimalsContext()

    async function deleteAnimal () {
    
        await handleDeleteAnimal(token, animal)
       
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", deleteAnimal)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", deleteAnimal)
        }
        //eslint-disable-next-line
    }, [token, animal])

    return (
        <span>Certeza que deseja remover <strong>{animal.animal_name}</strong>?</span>
    )
}