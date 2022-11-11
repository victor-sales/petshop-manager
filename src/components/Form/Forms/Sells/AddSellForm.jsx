import Input from "../../FormInputs/Input";

export default function AddSellForm(params) {
    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input 
                    labelText="Data/Hora"
                    id="date"
                    />
                <Input 
                    labelText="Vendedor"
                    id="Vendedor"
                    />
                <Input 
                    labelText="Comprador"
                    id="Comprador"
                    />
                <Input 
                    labelText="Produto"
                    id="Produto"
                    />
                <Input 
                    labelText="Quantidade"
                    id="Quantidade"
                    />
                <Input 
                    labelText="Descrição"
                    id="Descrição"
                    />
            </div>
        </form>
    )
};
