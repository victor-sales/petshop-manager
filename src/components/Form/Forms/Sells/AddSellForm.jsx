import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';
import useSellsContext from "../../../../hooks/useSellsContext"
import useAuthContext from "../../../../hooks/useAuthContext"
import { checkTutorValidity, checkDateValidity, checkProductNameValidity, checkCashierValidity, checkPriceValidity, checkSellAmountValidity } from "../../../../utils/Helpers";
import SellDatePicker from "../../FormInputs/DatePicker/SellDatePicker";
import Input from "../../FormInputs/Input"
import SelectEmployee from "../../FormInputs/Select/SelectEmployee";
import SelectUser from "../../FormInputs/Select/SelectUser"
import InputMoney from "../../FormInputs/Input/InputMoney";
import SelectProduct from "../../FormInputs/Select/SelectProduct";
import useProductsContext from "../../../../hooks/useProductsContext";

export default function AddSellForm ({}) {

    const sellObject = {id: uuid(), date: "", cashier: { _id: "", name: "" },  buyer: { _id: "", name: "" }, product: { _id: "", name: "", value: "" }, amount: 0, sell_value: "", observations: ""}

    const { token } = useAuthContext()
    const { handleCreateSell } = useSellsContext()
    const { products } = useProductsContext()

    const [sell, setSell] = useState(sellObject)
    const [date, setDate] = useState(new Date())
    const [sellValue, setSellValue] = useState("")
    
    const [dateError, setDateError] = useState("")
    const [employeeError, setEmployeeError] = useState("")
    const [userError, setUserError] = useState("")
    const [productError, setProductError] = useState("")
    const [amountError, setAmountError] = useState("")
    const [priceError, setPriceError] = useState("")

    const [disabledAmountValue, setDisabledAmountValue] = useState(true)

    async function createSell () {

        const dateIsValid = checkDateValidity(sell.date, setDateError)
        const employeeIsValid = checkCashierValidity(sell.cashier._id, setEmployeeError)
        const userIsValid = checkTutorValidity(sell.buyer._id, setUserError)
        const productIsValid = checkProductNameValidity(sell.product._id, setProductError)
        const amountIsValid = checkSellAmountValidity(products, sell, setAmountError)
        const priceIsValid = checkPriceValidity(sell.sell_value, setPriceError)

        const areValid = [dateIsValid, employeeIsValid, userIsValid, productIsValid, amountIsValid, priceIsValid].every(e => e)

        if (areValid) {
            await handleCreateSell(token, sell)
            setSell(sellObject)
            setDate(new Date)
            setSellValue("")
        } else {
            return false
        } 
    }

    function handleOnChangeCashier (e) {
        
        const cashier_id = e.target.value
        const cashier_name = e.target.selectedOptions[0].text

        setSell({
            ...sell, 
            cashier: { _id: cashier_id, name: cashier_name }
        })
    }

    function handleOnChangeUser (e) {
        
        const buyer_id = e.target.value
        const buyer_name = e.target.selectedOptions[0].text

        setSell({
            ...sell, 
            buyer: { _id: buyer_id, name: buyer_name }
        })
    }

    function handleOnChangeProduct (e) {

        const product_id = e.target.value
        const product_name = e.target.selectedOptions[0].text
        const product_price = e.target.selectedOptions[0].getAttribute("data-item-price")

        setSell({
            ...sell, 
            product: { _id: product_id, name: product_name, value: product_price }
        })
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")
        if (button) button.addEventListener("click", createSell)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", createSell)
        }
        //eslint-disable-next-line
    }, [token, sell])

    useEffect(() => {
        if(sell.amount) {
            let value = sell.amount * parseFloat(sell.product.value.replace(",", "."))
            value = value.toString().replace(".", ",")
            setSellValue(value)
        } 
        //eslint-disable-next-line
    }, [sell.amount])

    useEffect(() => {
        setSell({...sell, sell_value: sellValue})
        //eslint-disable-next-line
    }, [sellValue])

    useEffect(() => {
        setSell({...sell, date: date})
        //eslint-disable-next-line
    }, [date])

    useEffect(() => {
        sell.product._id ? 
            setDisabledAmountValue(false) :
            setDisabledAmountValue(true)
    }, [sell.product._id])

    return (
        <form>
            <div className="flex flex-col gap-1">
                <SellDatePicker date={date} setDate={setDate} error={dateError}/>
                <SelectEmployee value={sell.cashier._id} onChange={handleOnChangeCashier} error={employeeError}/>
                <SelectUser value={sell.buyer._id} onChange={handleOnChangeUser} error={userError}/>
                <SelectProduct value={sell.product._id} onChange={handleOnChangeProduct} error={productError}/>
                <Input  
                    labelText="Quantidade*"
                    id="amount"
                    required={true}
                    value={sell.amount}
                    onChange={(e) => setSell({...sell, amount: e.target.value})}
                    disabled={disabledAmountValue}
                    error={amountError}
                />
                <InputMoney disabled={disabledAmountValue} value={sellValue} setValue={setSellValue} error={priceError} />
                <Input 
                    labelText="Observações"
                    id="sell-obs"
                    required={true}
                    value={sell.observations}
                    onChange={(e) => setSell({...sell, observations: e.target.value})}  
                />
            </div>
        </form>
    )
}