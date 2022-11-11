import Input from "../../FormInputs/Input";
import Select from "../../FormInputs/Select";

export default function AddBreedForm(params) {
    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input 
                    labelText="Nome"
                    id="Nome"
                    />
                <Select 
                    required
                    id={"specie"}
                    labelText={"Espécie"}
                    
                    >
                    <option value={"cachorro"}>Cachorro</option>
                    <option value={"gato"}>Gato</option>
                </Select>
                <Input 
                    labelText="Descrição"
                    id="descricao"
                    />
            </div>
        </form>
    )
};
