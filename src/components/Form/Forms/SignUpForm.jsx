import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../FormInputs/Buttons/LoginButton";
import SocialMediaLoginButton from "../FormInputs/Buttons/SocialMediaLoginButton";
import Input from "../FormInputs/Input";
import { useRouter } from "next/router";

export default function SignUpForm (props) {
    
    const { setSignUp } = props
    const router = useRouter()

    return ( 
        <form>
            <Input 
                required
                id={"name"}
                type={"text"}
                labelText={"Nome"}
                // value={userName}
                // onChange={(e) => setUserName(e.target.value)}
            />
            <Input 
                required
                id={"email"}
                type={"text"}
                labelText={"E-mail"}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
            />
            <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Senha"}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
            />
            <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Confirmar senha"}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
            />
            <section className="flex flex-col gap-2">
                <LoginButton 
                    onClick={() => router.push("/")}
                    text="Cadastrar-me"/>
                <span onClick={() => {console.log("teste"); setSignUp(false)}} className="text-sm text-center underline">Já possuo uma conta. Entrar</span>
               
            </section>
        </form>
    )
}