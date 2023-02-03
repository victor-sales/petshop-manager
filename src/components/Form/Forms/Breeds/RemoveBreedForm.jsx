import { useEffect } from "react"
import useBreedsContext from "../../../../hooks/useBreedsContext"
import useAuthContext from "../../../../hooks/useAuthContext"

export default function RemoveBreedForm ({breed}) {
    const { token } = useAuthContext()
    const { handleDeleteBreed } = useBreedsContext()

    async function deleteBreed () {
    
        await handleDeleteBreed(token, breed)
       
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", deleteBreed)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", deleteBreed)
        }
        //eslint-disable-next-line
    }, [token, breed])

    return (
        <span>Certeza que deseja remover <strong>{breed.breed_name}</strong>?</span>
    )
}