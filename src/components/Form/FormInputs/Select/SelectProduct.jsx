import { useEffect } from "react";
import Select from ".";
import useAuthContext from "../../../../hooks/useAuthContext";
import useProductsContext from "../../../../hooks/useProductsContext";

export default function SelectProduct ({value, onChange, error, ...props}) {

    const { token } = useAuthContext()
    const { handleGetProducts, products } = useProductsContext()
    
    useEffect(() => {
        if (!products.length) handleGetProducts(token)
        //eslint-disable-next-line
    }, [token])
    
    return (
        <Select 
            id='select-product'
            value={value}
            onChange={onChange}
            labelText="Produto*"
            required
            error={error}
        >
            <option value={""} disabled>...</option>
            {products?.map((e, key) => (
                <option key={key} data-item-price={e.price} value={e.id} disabled={e.amount < 1}>{`${e.product_name} ${e.amount < 1 ? " - Sem estoque" : ""}`}</option>
            ))}
        </Select>
    )
}