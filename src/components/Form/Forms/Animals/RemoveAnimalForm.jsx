import { useEffect } from "react"
import useAnimalsContext from "../../../../hooks/useAnimalsContext"
import useAuthContext from "../../../../hooks/useAuthContext"

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