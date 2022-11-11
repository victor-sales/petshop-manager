import Input from "../../FormInputs/Input"

export default function AddAnimalForm (props) {

    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input 
                    labelText="Nome"
                    id="Nome"
                    />
                <Input 
                    labelText="Tutor"
                    id="Tutor"
                    />
                <Input 
                    labelText="Raça"
                    id="Raça"
                    />
                <Input 
                    labelText="Espécie"
                    id="Espécie"
                    />
                <Input 
                    labelText="Descrição"
                    id="Descrição"
                    />
            </div>
        </form>
    )
}