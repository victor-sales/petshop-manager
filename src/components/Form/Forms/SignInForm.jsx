import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../FormInputs/Buttons/LoginButton";
import SocialMediaLoginButton from "../FormInputs/Buttons/SocialMediaLoginButton";
import Input from "../FormInputs/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Modal } from "antd";

export default function SignInForm (props) {

    const { setSignUp } = props
    const router = useRouter()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)

    return (
        <form>
            <Input 
                required
                id={"username"}
                type={"text"}
                labelText={"E-mail"}
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
                                    <span onClick={() => setVisible(true)} className="text-sm text-center underline">Esqueci minha senha</span>

            </section>
            <Modal
            key={"forgot_pw"}
            onOk={() => setVisible(false)}
            okText="Enviar"
            cancelText="Fechar"
            title="Modal"
            open={visible}>
                <ForgotPasswordForm />
            </Modal>
        </form>
    )
}