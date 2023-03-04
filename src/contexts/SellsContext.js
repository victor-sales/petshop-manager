import { createContext, useState } from "react"
import useProductsContext from "../hooks/useProductsContext";
import { APIMethods, MessageTypes, RequestActionType } from "../utils/Enums";
import RequestHandler from "../utils/RequestHandler";

const SellsContext = createContext()

export function SellsProvider({children}) {

    const { products, handleUpdateProduct } = useProductsContext()

    const [sells, setSells] = useState([])
    const [sellMessage, setSellMessage] = useState("")
    const [sellMessageType, setSellMessageType] = useState("")
    const [loadingSells, setLoadingSells] = useState(false)
    const [loadingCreateSell, setLoadingCreateSell] = useState(false)
    const [loadingUpdateSell, setLoadingUpdateSell] = useState(false)
    const [loadingDeleteSell, setLoadingDeleteSell] = useState(false)

    async function handleGetSells (accessToken) {
        setLoadingSells(true)

        const url = `/api/sells`
        const method = APIMethods.GET

        try {
            let response = await RequestHandler(accessToken, url, method)

            if (response.response?.status === 200) {
                setLoadingSells(false)
                setSells(response.data)
                return response.data
            } else {
                setLoadingSells(false)
                setSells([])
                throw new Error(JSON.stringify(response))
            }
                       
        } catch (error) {
            setLoadingSells(false)
            let e = JSON.parse(error.message)
            setSellMessageType(MessageTypes.ERROR)
            setSellMessage(e.message)
            return false
        }

    }

    const handleCreateSell = async (accessToken, sell) => {
                
        const url = `/api/sells/${sell.id}`
        const method = APIMethods.POST
        const body = sell

        try {
            setLoadingCreateSell(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.CREATE_SELL)

            if (response.response?.status === 201) {
                setLoadingCreateSell(false)
                setSellMessageType(MessageTypes.SUCCESS)
                setSellMessage(`Venda cadastrada com sucesso.`)
                setSells([...sells, response.data])

                if (response.data) await updateProductAmount(accessToken, response.data, RequestActionType.CREATE_SELL)

                return response

            } else {
                setLoadingCreateSell(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setSellMessageType(MessageTypes.ERROR)
            setSellMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleUpdateSell (accessToken, sell) {        
        const url = `/api/sells/${sell.id}`
        const method = APIMethods.PUT
        const body = sell

        try {
            setLoadingUpdateSell(true)
            
            let response = await RequestHandler(accessToken, url, method, body, RequestActionType.UPDATE_SELL)

            if (response.response?.status === 200) {
                setLoadingUpdateSell(false)
                setSellMessageType(MessageTypes.SUCCESS)
                setSellMessage(`Dados alterados com sucesso.`)
                findOnArrayAndUpdate(sell.id, response.data)

                if (response.data) await updateProductAmount(accessToken, response.data)

                return response

            } else {
                setLoadingUpdateSell(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setSellMessageType(MessageTypes.ERROR)
            setSellMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function handleDeleteSell (accessToken, sell) {        
        const url = `/api/sells/${sell.id}`
        const method = APIMethods.DELETE
        
        try {
            setLoadingDeleteSell(true)
            
            let response = await RequestHandler(accessToken, url, method, null, RequestActionType.DELETE_SELL)

            if (response.response?.status === 200) {

                setLoadingDeleteSell(false)
                setSellMessageType(MessageTypes.SUCCESS)
                setSellMessage(`Venda foi removida com sucesso.`)
                findOnArrayAndUpdate(sell.id, response.data)

                await updateProductAmount(accessToken, sell, RequestActionType.DELETE_SELL)

                return response

            } else {
                setLoadingDeleteSell(false)
                throw new Error(JSON.stringify(response))
            }

        } catch (error) {
            let e = JSON.parse(error.message)
            setSellMessageType(MessageTypes.ERROR)
            setSellMessage(e.message + ": " + e.details ?? "")
            return false
        }
    }

    async function updateProductAmount (accessToken, sell, type) {
        
        let product = products.filter(e => e.id === sell.product._id)[0]
        let product_amount = 0

        if (type === RequestActionType.DELETE_SELL) product_amount = product.amount + sell.amount
        else product_amount = product.amount - sell.amount

        product = {...product, amount: product_amount}
        
        await handleUpdateProduct(accessToken, product)

    }

    function findOnArrayAndUpdate (id, data) {
        if (!Object.values(data).length) {
            setSells(sells.filter(e => e.id !== id))
        } else {
            const arr = [...sells]
            const idx = arr.map(e => e.id).indexOf(id)
            
            arr[idx] = data
            
            setSells(arr)
        }
    }

    return ( 
        <SellsContext.Provider
            value={{
                handleGetSells,
                handleCreateSell,
                handleUpdateSell,
                handleDeleteSell,
                sells,
                sellMessage, setSellMessage,
                sellMessageType, setSellMessageType,
                loadingSells,
                loadingCreateSell,
                loadingUpdateSell,
                loadingDeleteSell
            }}
        >
            { children }
        </SellsContext.Provider>
        
    )
}

export default SellsContext;
