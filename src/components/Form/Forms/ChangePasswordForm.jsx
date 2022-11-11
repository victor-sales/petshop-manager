import Input from "../FormInputs/Input";

export default function ChangePasswordForm(props) {
    return (
        <form>
            <Input labelText={"Senha atual"} id="senha_atual"/>
            <Input labelText={"Nova senha"} id="nova_senha"/>
            <Input labelText={"Confirmar senha"} id="confirmar_senha"/>
            <section className="flex flex-col items-end">
                    <button className="bg-blue-500 hover:bg-blue-600 pb-1 text-white font-semibold border border-gray-300 rounded-md shadow-md h-6 w-full md:w-24 mt-2" type="submit">Alterar</button>
            </section>
        </form>
    )
};
