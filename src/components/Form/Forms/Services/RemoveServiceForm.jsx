import { useEffect } from "react"
import useServicesContext from "../../../../hooks/useServicesContext"
import useAuthContext from "../../../../hooks/useAuthContext"

export default function RemoveServiceForm ({service}) {
    const { token } = useAuthContext()
    const { handleDeleteService } = useServicesContext()

    async function deleteService () {
    
        await handleDeleteService(token, service)
       
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", deleteService)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", deleteService)
        }
        //eslint-disable-next-line
    }, [token, service])

    return (
        <span>Certeza que deseja remover <strong>{service.service_name}</strong>?</span>
    )
}