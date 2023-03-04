import { createContext, useState } from "react"
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const ProductsContext = createContext()

export function ProductsProvider({children}) {

    const [products, setProducts] = useState([])
    const [productMessage, setProductMessage] = useState("")
    const [productMessageType, setProductMessageType] = useState("")
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [loadingCreateProduct, setLoadingCreateProduct] = useState(false)
    const [loadingUpdateProduct, setLoadingUpdateProduct] = useState(false)
    const [loadingDeleteProduct, setLoadingDeleteProduct] = useState(false)

    async function handleGetProducts (accessToken) {
        setLoadingProducts(true)

        const url = `/api/products`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)

            if (response.response?.status === 200) {
                setLoadingProducts(false)
                setProducts(response.data)
                return response.data
            } else {
                setLoadingProducts(false)
                setProducts([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingProducts(false)
            let e = JSON.parse(error.message)
            setProductMessageType(MessageTypes.ERROR)
            setProductMessage(e.message)
            return false
        }

    }

    const handleCreateProduct = async (accessToken, product) => {
                
        const url = `/api/products/${product.id}`
        const method = APIMethods.POST
        const body = product

        try {
            setLoadingCreateProduct(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.CREATE_PRODUCT)

            if (response.response?.status === 201) {
                setLoadingCreateProduct(false)
                setProductMessageType(MessageTypes.SUCCESS)
                setProductMessage(`Produto criado com sucesso.`)
                setProducts([...products, response.data])
                return response

            } else {
                setLoadingCreateProduct(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setProductMessageType(MessageTypes.ERROR)
            setProductMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleUpdateProduct (accessToken, product) {        
        const url = `/api/products/${product.id}`
        const method = APIMethods.PUT
        const body = product

        try {
            setLoadingUpdateProduct(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.UPDATE_PRODUCT)

            if (response.response?.status === 200) {
                setLoadingUpdateProduct(false)
                setProductMessageType(MessageTypes.SUCCESS)
                setProductMessage(`Dados alterados com sucesso.`)
                findOnArrayAndUpdate(product.id, response.data)
                return response

            } else {
                setLoadingUpdateProduct(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setProductMessageType(MessageTypes.ERROR)
            setProductMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleDeleteProduct (accessToken, product) {        
        const url = `/api/products/${product.id}`
        const method = APIMethods.DELETE
        const body = product
        
        try {
            setLoadingDeleteProduct(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.DELETE_PRODUCT)

            if (response.response?.status === 200) {

                setLoadingDeleteProduct(false)
                setProductMessageType(MessageTypes.SUCCESS)
                setProductMessage(`${product.product_name} foi removido com sucesso.`)
                findOnArrayAndUpdate(product.id, response.data)

                return response

            } else {
                setLoadingDeleteProduct(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setProductMessageType(MessageTypes.ERROR)
            setProductMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    function findOnArrayAndUpdate (id, data) {
        if (!Object.values(data).length) {
            setProducts(products.filter(e => e.id !== id))
        } else {
            const arr = [...products]
            const idx = arr.map(e => e.id).indexOf(id)
            
            arr[idx] = data
            
            setProducts(arr)
        }
        
    }

    return ( 
        <ProductsContext.Provider
            value={{
                handleGetProducts,
                handleCreateProduct,
                handleUpdateProduct,
                handleDeleteProduct,
                products,
                productMessage, setProductMessage,
                productMessageType, setProductMessageType,
                loadingProducts,
                loadingCreateProduct,
                loadingUpdateProduct,
                loadingDeleteProduct
            }}
        >
            { children }
        </ProductsContext.Provider>
        
    )
}

export default ProductsContext;
