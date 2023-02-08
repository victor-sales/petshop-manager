import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import useProductsContext from "../../../../hooks/useProductsContext"
import useAuthContext from "../../../../hooks/useAuthContext"
import { checkProductNameValidity, checkBrandValidity, checkTypeValidity, checkPriceValidity, checkAmountValidity } from "../../../../utils/Helpers";
import Input from "../../FormInputs/Input"
import InputMoney from "../../FormInputs/Input/InputMoney";

export default function EditProductForm ({product, setProduct}) {

    const { token } = useAuthContext()
    const { handleUpdateProduct } = useProductsContext()
    
    const [price, setPrice] = useState(product.price)
    
    const [productNameError, setProductNameError] = useState("")
    const [brandError, setBrandError] = useState("")
    const [typeError, setTypeError] = useState("")
    const [priceError, setPriceError] = useState("")
    const [amountError, setAmountError] = useState("")

    async function updateProduct () {
        
        const nameIsValid = checkProductNameValidity(product.product_name, setProductNameError)
        const brandIsValid = checkBrandValidity(product.brand, setBrandError)
        const typeIsValid = checkTypeValidity(product.type, setTypeError)
        const priceIsValid = checkPriceValidity(product.price, setPriceError)
        const amountIsValid = checkAmountValidity(product.amount, setAmountError)

        const areValid = [nameIsValid, brandIsValid, typeIsValid, priceIsValid, amountIsValid].every(e => e)

        if (areValid) {
            await handleUpdateProduct(token, product)
        } else {
            return false
        } 
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", updateProduct)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", updateProduct)
        }
        //eslint-disable-next-line
    }, [token, product])

    useEffect(() => {
        
        setProduct({...product, price: price?.value ?? price})
        //eslint-disable-next-line
    }, [price])

    useEffect(() => {
        console.log(product)
        //eslint-disable-next-line
    }, [product])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input  
                    labelText="Nome do Produto*"
                    id="product-name"
                    required={true}
                    type={"text"}
                    value={product.product_name}
                    onChange={(e) => setProduct({...product, product_name: e.target.value})}
                    error={productNameError}
                    />
                <Input  
                    labelText="Marca*"
                    id="brand"
                    required={true}
                    type={"text"}
                    value={product.brand}
                    onChange={(e) => setProduct({...product, brand: e.target.value})}
                    error={brandError}
                    />
                <Input  
                    labelText="Tipo*"
                    id="type"
                    required={true}
                    type={"text"}
                    value={product.type}
                    onChange={(e) => setProduct({...product, type: e.target.value})}
                    error={typeError}
                    />
                <InputMoney value={price} setValue={setPrice} error={priceError} />
                <Input  
                    labelText="Quantidade*"
                    id="amount"
                    required={true}
                    type={"number"}
                    value={product.amount}
                    onChange={(e) => setProduct({...product, amount: e.target.value})}
                    error={amountError}
                    />
            </div>
        </form>
    )
}