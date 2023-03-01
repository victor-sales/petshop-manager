import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import useUserAccountContext from "../../../hooks/useUserAccountContext";
import useUsersContext from "../../../hooks/useUsersContext";
import Input from "../FormInputs/Input";

export default function RemoveMyAccountForm () {

    const router = useRouter()
    const { token } = useAuthContext()
    const { userAccount } = useUserAccountContext()
    const { handleDeleteUser } = useUsersContext()

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    async function deleteUser () {

        if (userAccount?.email === email) {
            const user = await handleDeleteUser(token, userAccount)
            
            if (user !== false) {
                Cookies.remove("logged-in")
                router.push("/login")
            } 
        } else {
            setEmailError("E-mail não confere com o da sua conta.")
        }
        
    }

    useEffect(() => {
        const button = document.getElementById("confirm-button")

        if (button) button.addEventListener("click", deleteUser)

        return () => {
            const button = document.getElementById("confirm-button")
            if (button) button.removeEventListener("click", deleteUser)
        }
        //eslint-disable-next-line
    }, [token, email])
    
    return (
        <form>
            <p>Confirme seu email para prosseguir com a remoção</p>
            <Input 
                id={"confirm-email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelText={"E-mail"}
                type={"text"}
                error={emailError}
            />
        </form>
    )
}