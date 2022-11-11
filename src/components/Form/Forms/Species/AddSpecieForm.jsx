import Input from "../../FormInputs/Input";

export default function AddSpecieForm(params) {
    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input 
                    labelText="Nome"
                    id="Nome"
                    />
                <Input 
                    labelText="Descrição"
                    id="Descrição"
                    />
            </div>
        </form>
    )
};
