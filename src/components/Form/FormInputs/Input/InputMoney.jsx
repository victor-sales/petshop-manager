import Label from '../Label'
import SpanError from '../SpanError'

export default function InputMoney ({error, value, setValue}) {

    const regex = new RegExp(/^[-,0-9]+$/)

    function handleOnChange (e) {
        if (e.target.value) {
            if (regex.test(e.target.value)) setValue(e.target.value)
        } else {
            setValue(e.target.value)
        }
    }

    return (
        <div className="flex flex-col w-full mb-1">
            <Label htmlFor={"money-input"} text={"Preço"}/>
            <div className='flex items-center border border-gray-300 h-8 rounded-md'>
                <div className='font-semibold bg-gray-300 px-2 py-1 rounded-l-md h-full text-gray-700'>
                    R$
                </div>
                <input 
                    className={"w-full px-2 outline-0 text-sm disabled:bg-gray-200 rounded-r-md"}
                    id={"money-input"} 
                    value={value}
                    onChange={handleOnChange}
                />
            </div>
            <SpanError error={error} />
        </div>
    )
}