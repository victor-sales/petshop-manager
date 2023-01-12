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

    const Router = useRouter()
    const { handleConnectUserWithProvider, handleSignInWithEmailPassword, handleUserAndSession, authMessage, setAuthMessage, authMessageType, setAuthMessageType } = useAuthContext()
    const { handleCreateUser, handleGetUserById } = useUsersContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
   
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    async function connectUserWithProvider (authProvider) {
 
        const firebaseUser = await handleConnectUserWithProvider(authProvider)
        
        if (firebaseUser) {
            const user = await handleGetUserById(firebaseUser.accessToken, firebaseUser.uid)
            
            if (!user) {
                await handleCreateUser(firebaseUser.accessToken, firebaseUser.uid, firebaseUser.displayName, firebaseUser.email)
                
                handleUserAndSession(firebaseUser)

            } else {
                Router.push("/")
            }
        }
    }

    async function handleConnectWithEmailPassword () {
        
        const valid = [checkEmailValidity(), checkPasswordValidity()].every(e => e)
        
        if (!valid) {
            return false
        }
 
        await handleSignInWithEmailPassword(email, password)
    }

    function checkEmailValidity () {
        if (!email) {
            setEmailError("Email não pode ser vazio")
            return false
        }
        return true
    }

    function checkPasswordValidity () {
        if (!password) {
            setPasswordError("Senha não pode ser vazia")
            return false
        }
        return true
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
                id={"email"}
                type={"text"}
                labelText={"E-mail"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />
            <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Senha"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
            />
            <BannerError type={authMessageType} setType={setAuthMessageType} message={authMessage} setMessage={setAuthMessage}/>
            <section className="flex flex-col gap-2 mt-2">
                <LoginButton 
                    onClick={handleConnectWithEmailPassword}
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