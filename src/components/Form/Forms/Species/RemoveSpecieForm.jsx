import { useEffect } from "react"
import useSpeciesContext from "../../../../hooks/useSpeciesContext"
import useAuthContext from "../../../../hooks/useAuthContext"

export default function RemoveSpecieForm ({specie}) {
    const { token } = useAuthContext()
    const { handleDeleteSpecie } = useSpeciesContext()

    async function deleteSpecie () {
    
        await handleDeleteSpecie(token, specie)
       
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", deleteSpecie)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", deleteSpecie)
        }
        //eslint-disable-next-line
    }, [token, specie])

    return (
        <span>Certeza que deseja remover <strong>{specie.specie_name}</strong>?</span>
    )
}