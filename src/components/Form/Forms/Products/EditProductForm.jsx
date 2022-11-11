import Input from "../../FormInputs/Input";

export default function EditProductForm(params) {
    return (
        <form>
        <div className="flex flex-col gap-1">
            <Input 
                labelText="Marca"
                id="Marca"
                />
            <Input 
                labelText="Tipo"
                id="Tipo"
                />
            <Input 
                labelText="Nome"
                id="Nome"
                />
            <Input 
                labelText="Preço"
                id="Preço"
                />
            <Input 
                labelText="Quantidade"
                id="Quantidade"
                />
        </div>
    </form>
    )
};
