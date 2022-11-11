import Input from "../../FormInputs/Input";

export default function EditUserForm(params) {
    return (
        <form>
            <div className="flex flex-col gap-1">
                <Input 
                    labelText="Nome"
                    id="Nome"
                    />
                <Input 
                    labelText="Email"
                    id="Email"
                    />
                <Input 
                    labelText="Telefone"
                    id="Telefone"
                    />
                <Input 
                    labelText="Perfil"
                    id="Perfil"
                    />
                <Input 
                    labelText="Função"
                    id="Funcao"
                    />
            </div>
        </form>
    )
};
