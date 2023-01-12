
import Input from "../FormInputs/Input";
import useAuthContext from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import useUsersContext from "../../../hooks/useUsersContext";
import LoginButton from "../FormInputs/Buttons/LoginButton";
import BannerError from "../../BannerError/BannerError";

export default function SignUpForm ({setSignUp}) {
    
    const { handleCreateUserWithEmailPassword , authMessage, setAuthMessage, authMessageType, setAuthMessageType} = useAuthContext()
    const { handleCreateUser } = useUsersContext()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [usernameError, setUsernameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    async function createUser () {
        const valid = [checkUsernameValidity(), checkEmailValidity(), checkPasswordValidity(), checkPasswordEquality()].every(e => e)
        
        if (!valid) {
            return false
        }

        const firebaseUser = await handleCreateUserWithEmailPassword(email, password)
        
        if (firebaseUser) {
            await handleCreateUser(firebaseUser.accessToken, firebaseUser.uid, username, firebaseUser.email)
        }
    }

    function checkUsernameValidity () {
        if (!username) {
            setUsernameError("Nome não pode ser vazio.")
            return false
        }

        return true
    }

    function checkEmailValidity () {
        if (!email) {
            setEmailError("Email não pode ser vazio")
            return false
        }
        return true
    }

    function checkPasswordValidity () {
        if (password.length < 6) {
            setPasswordError("Sua senha precisa conter pelo menos 6 caractéres.")
            return false
        } 

        setPasswordError("")
        return true
    }

    function checkPasswordEquality () {
        if (confirmPassword !== password) {
            setConfirmPasswordError("As senhas precisam ser iguais.")
            return false
        } 

        setConfirmPasswordError("")
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
                id={"name"}
                type={"text"}
                labelText={"Nome*"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                
            />
            <Input 
                required
                id={"email"}
                type={"text"}
                labelText={"E-mail*"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />
            <Input 
                required
                id={"password"}
                type={"password"}
                labelText={"Senha*"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
            />
            <Input 
                required
                id={"confirmPassword"}
                type={"password"}
                labelText={"Confirmar senha*"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
                onBlur={checkPasswordEquality}
            />
            <BannerError type={authMessageType} setType={setAuthMessageType} message={authMessage} setMessage={setAuthMessage}/>
            <section className="flex flex-col gap-2 mt-2">
                <LoginButton 
                    onClick={createUser}
                    text="Cadastrar-me"/>
                <span onClick={() => setSignUp(false)} className="text-sm text-center underline">Já possuo uma conta. Entrar</span>
            </section>
        </form>
    )
}