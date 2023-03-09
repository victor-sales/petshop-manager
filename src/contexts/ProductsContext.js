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

    function exportProducts () {
        try {
            if (products.length) handleExportFile(products, `produtos.csv`)
            else alert("Não é possível exportar com dados vazios");
        } catch (error) {
            alert("Erro ao processar exportação");
        }
    }

    function handleExportFile (products, fileName) {
        let rows = products.sort((a, b) => a.date - b.date).map(product => ([
                product.product_name,
                product.brand,
                product.type,
                `R$ ${product.price}`,
                product.amount,
                
        ]))
       
        let headers = ["Produto", "Marca", "Tipo", "Preço", "Quantidade"]
        
        let table = [headers, ...rows]

        table = table.map(e => e.join(",")).join("\n")

        let csvContent = "data:text/csv;charset=utf-8," + table;
        let link = document.createElement("a");

        link.download = fileName;
        link.href = csvContent;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 

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
                exportProducts,
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
