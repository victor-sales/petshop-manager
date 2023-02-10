import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import useProductsContext from "../../../../hooks/useProductsContext"
import useAuthContext from "../../../../hooks/useAuthContext"
import { checkProductNameValidity, checkBrandValidity, checkTypeValidity, checkPriceValidity, checkAmountValidity } from "../../../../utils/Helpers";
import Input from "../../FormInputs/Input"
import InputMoney from "../../FormInputs/Input/InputMoney";

export default function AddProductForm ({}) {

    const productObject = {id: uuid(), product_name: "",  brand: "", type: "", price: "0", amount: 0}

    const { token } = useAuthContext()
    const { handleCreateProduct } = useProductsContext()
    
    const [price, setPrice] = useState("0")
    const [product, setProduct] = useState(productObject)
    
    const [productNameError, setProductNameError] = useState("")
    const [brandError, setBrandError] = useState("")
    const [typeError, setTypeError] = useState("")
    const [priceError, setPriceError] = useState("")
    const [amountError, setAmountError] = useState("")

    async function createProduct () {
        
        const nameIsValid = checkProductNameValidity(product.product_name, setProductNameError)
        const brandIsValid = checkBrandValidity(product.brand, setBrandError)
        const typeIsValid = checkTypeValidity(product.type, setTypeError)
        const priceIsValid = checkPriceValidity(product.price, setPriceError)
        const amountIsValid = checkAmountValidity(product.amount, setAmountError)

        const areValid = [nameIsValid, brandIsValid, typeIsValid, priceIsValid, amountIsValid].every(e => e)

        if (areValid) {
            await handleCreateProduct(token, product)
            setProduct(productObject)
            setPrice("0")
        } else {
            return false
        } 
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", createProduct)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", createProduct)
        }
        //eslint-disable-next-line
    }, [token, product])

    useEffect(() => {
        setProduct({...product, price: price})
        //eslint-disable-next-line
    }, [price])

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