import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../FormInputs/Buttons/LoginButton";
import SocialMediaLoginButton from "../FormInputs/Buttons/SocialMediaLoginButton";
import Input from "../FormInputs/Input";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignInForm (props) {

    const { setSignUp } = props
    const router = useRouter()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form>
            <Input 
                required
                id={"username"}
                type={"text"}
                labelText={"Usuário"}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Senha"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <section className="flex flex-col gap-2">
                <LoginButton 
                    onClick={() => router.push("/")}
                    text="Entrar"/>
                <span onClick={() => setSignUp(true)} className="text-sm text-center underline">Não possui cadastro? Criar uma conta</span>
                <SocialMediaLoginButton 
                    socialMediaName={"Google"} 
                    socialMediaIcon={<FontAwesomeIcon icon={faGoogle} />} 
                    onClick={() => console.log('teste')}/>
                <SocialMediaLoginButton 
                    socialMediaName={"Facebook"} 
                    socialMediaIcon={<FontAwesomeIcon icon={faFacebook} />} 
                    onClick={() => console.log('teste')}/>
            </section>
        </form>
    )
}