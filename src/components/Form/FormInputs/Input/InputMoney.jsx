import { NumericFormat } from 'react-number-format';
import Label from '../Label';
import SpanError from '../SpanError';

export default function InputMoney ({error, value, setValue}) {
    return (
        <div className="flex flex-col w-full mb-1">
            <Label htmlFor={"price"} text={"Preço*"}/>
            <NumericFormat 
                id='price'
                className='border border-gray-300 rounded-md h-8 w-full p-2 outline-1 outline-gray-300 text-sm disabled:bg-gray-200'
                value={value}
                // type='number'
                thousandSeparator="."
                decimalSeparator=','
                prefix='R$'
                onValueChange={(value, sourceInfo) => {
                    console.log(value)
                    setValue(value)
                }}
            />
            <SpanError error={error} />
        </div>
    )
}