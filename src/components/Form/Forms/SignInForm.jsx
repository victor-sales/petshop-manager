import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../FormInputs/Buttons/LoginButton";
import SocialMediaLoginButton from "../FormInputs/Buttons/SocialMediaLoginButton";
import Input from "../FormInputs/Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Modal } from "antd";
import useAuthContext from "../../../hooks/useAuthContext"
import { AuthProviders } from "../../../utils/Enums";
import useUsersContext from "../../../hooks/useUsersContext";
import BannerError from "../../BannerError/BannerError";

export default function SignInForm ({setSignUp}) {

    const router = useRouter()
    const { handleConnectUserWithProvider, handleSignInWithEmailPassword, authMessage, setAuthMessage, authMessageType, setAuthMessageType } = useAuthContext()
    const { handleCreateUser } = useUsersContext()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)

    async function connectUserWithProvider (authProvider) {
        // 
        const firebaseUser = await handleConnectUserWithProvider(authProvider)

        if (!firebaseUser) {
            await handleCreateUser(firebaseUser.accessToken, firebaseUser.displayName, firebaseUser.email)
        } else {
            //logar usuário
            // redirect to login
        }
    }

    useEffect(() => {
        setAuthMessage("")
        setAuthMessageType("")
        //eslint-disable-next-line
    }, [setSignUp])

    return (
        <form>
            <Input 
                required
                id={"username"}
                type={"text"}
                labelText={"E-mail"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Senha"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <BannerError type={authMessageType} setType={setAuthMessageType} message={authMessage} setMessage={setAuthMessage}/>
            <section className="flex flex-col gap-2 mt-2">
                <LoginButton 
                    onClick={() => handleSignInWithEmailPassword(username, password)}
                    text="Entrar"/>
                <span onClick={() => setSignUp(true)} className="text-sm text-center underline">Não possui cadastro? Criar uma conta</span>                
                <SocialMediaLoginButton 
                    socialMediaName={"Google"} 
                    socialMediaIcon={<FontAwesomeIcon icon={faGoogle} />} 
                    onClick={() => connectUserWithProvider(AuthProviders.GOOGLE)}/>
                {/* <SocialMediaLoginButton 
                    socialMediaName={"Facebook"} 
                    socialMediaIcon={<FontAwesomeIcon icon={faFacebook} />} 
                    onClick={() => createUserWithProvider(AuthProviders.FACEBOOK)}/> */}
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