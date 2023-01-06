import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../FormInputs/Buttons/LoginButton";
import SocialMediaLoginButton from "../FormInputs/Buttons/SocialMediaLoginButton";
import Input from "../FormInputs/Input";
import { useRouter } from "next/router";
import useAuthContext from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import useUsersContext from "../../../hooks/useUsersContext";

export default function SignUpForm (props) {
    
    const { setSignUp } = props
    const router = useRouter()
    const { handleCreateUserWithEmailPassword } = useAuthContext()
    const { handleCreateUser } = useUsersContext()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const createUser = async () => {
        const firebaseUser = await handleCreateUserWithEmailPassword(email, password)
        console.log(firebaseUser)
        const user = await handleCreateUser(firebaseUser.accessToken, username, firebaseUser.email)
        console.log(user)
    }

    useEffect(() => {
        console.log(username)
    }, [username])
    
    return ( 
        <form>
            <Input 
                required
                id={"name"}
                type={"text"}
                labelText={"Nome"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
                required
                id={"email"}
                type={"text"}
                labelText={"E-mail"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Senha"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Confirmar senha"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /> */}
            <section className="flex flex-col gap-2">
                <LoginButton 
                    onClick={() => createUser()}
                    text="Cadastrar-me"/>
                <span onClick={() => {console.log("teste"); setSignUp(false)}} className="text-sm text-center underline">Já possuo uma conta. Entrar</span>
               
            </section>
        </form>
    )
}