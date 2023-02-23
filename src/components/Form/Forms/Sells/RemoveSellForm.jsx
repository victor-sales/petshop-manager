import { useEffect } from "react"
import useSellsContext from "../../../../hooks/useSellsContext"
import useAuthContext from "../../../../hooks/useAuthContext"

export default function RemoveSellForm ({sell}) {
    const { token } = useAuthContext()
    const { handleDeleteSell } = useSellsContext()

    async function deleteSell () {
    
        await handleDeleteSell(token, sell)
       
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", deleteSell)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", deleteSell)
        }
        //eslint-disable-next-line
    }, [token, sell])

    return (
        <span>Certeza que deseja remover <strong>{sell.sell_name}</strong>?</span>
    )
}