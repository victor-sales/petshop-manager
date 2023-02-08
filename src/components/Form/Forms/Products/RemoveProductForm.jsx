import { useEffect } from "react"
import useProductsContext from "../../../../hooks/useProductsContext"
import useAuthContext from "../../../../hooks/useAuthContext"

export default function RemoveProductForm ({product}) {
    const { token } = useAuthContext()
    const { handleDeleteProduct } = useProductsContext()

    async function deleteProduct () {
    
        await handleDeleteProduct(token, product)
       
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", deleteProduct)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", deleteProduct)
        }
        //eslint-disable-next-line
    }, [token, product])

    return (
        <span>Certeza que deseja remover <strong>{product.product_name}</strong>?</span>
    )
}