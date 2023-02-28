import Input from "../FormInputs/Input";
import BannerMessage from "../../BannerMessage/BannerMessage";
import { useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import { ArrowPathIcon } from "@heroicons/react/24/solid"

export default function ChangePasswordForm(props) {

    const { handleUpdateUserPassword, authMessage, setAuthMessage, authMessageType, setAuthMessageType, loadingChangePassword } = useAuthContext()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassord, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [oldPasswordError, setOldPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    function clearMessages() {
        setOldPasswordError("")
        setNewPasswordError("")
        setConfirmPasswordError("")
    }

    async function handleChangePassword (e) {
        clearMessages()

        if (!oldPassword) {
            setOldPasswordError("Senha atual não pode ser vazia")
            return false
        } else if (newPassord.length < 6) {
            setNewPasswordError("Nova senha precisa ter pelo menos 6 caractéres")
            return false
        } else if (oldPassword === newPassord) {
            setOldPasswordError("As senhas não podem ser iguais")
            setNewPasswordError("As senhas não podem ser iguais")
            return false

        } else if (newPassord !== confirmPassword) {
            setNewPasswordError("A senhas não conferem")
            setConfirmPasswordError("As senhas não conferem")
            return false
        }
        
        await handleUpdateUserPassword(oldPassword, newPassord)   
    }

    return (
        <form>
            <Input
                labelText={"Senha atual"} 
                id="senha-atual"
                type={"text"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                error={oldPasswordError}
            />
            <Input
                labelText={"Nova senha"}
                id="nova-senha"
                type={"text"}
                value={newPassord}
                onChange={(e) => setNewPassword(e.target.value)}
                error={newPasswordError}/>
            <Input
                labelText={"Confirmar senha"}
                id="confirmar-senha"
                type={"text"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}/>
            <button 
                onClick={handleChangePassword} 
                disabled={loadingChangePassword}
                type="button"
                className="bg-blue-500 hover:bg-blue-600 py-1 text-white font-semibold border border-gray-300 rounded-md shadow-md h-6 w-full my-2 flex items-center justify-center">
                    {loadingChangePassword ? 
                        <ArrowPathIcon className="h-4 w-4 animate-spin"/> : 
                        'Alterar'
                    }
            </button>
            <BannerMessage message={authMessage} setMessage={setAuthMessage} type={authMessageType} setType={setAuthMessageType}/>
        </form>
    )
};
