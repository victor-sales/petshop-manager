import { createContext, useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth"
import firebase from "../utils/FirebaseConfig"
import { FirebaseError } from "firebase/app"
import { AuthProviders, MessageTypes } from "../utils/Enums"

const AuthContext = createContext()

export function AuthProvider({children}) {

    const [authMessage, setAuthMessage] = useState("")
    const [authMessageType, setAuthMessageType] = useState("")

    function FirebaseErrorHandler (error) {

        setAuthMessageType(MessageTypes.ERROR)

        switch (error.code) {
            case "auth/email-already-in-use":
                setAuthMessage("E-mail já está em uso.")
                break;
            case "auth/wrong-password":
                setAuthMessage("Senha incorreta.")
                break;
            case "auth/network-request-failed":
                setAuthMessage("Erro na rede. Verifique sua conexão com a internet.")
                break;
            case "auth/weak-password":
                setAuthMessage("Senha fraca. Sua senha precisa conter pelo menos 6 caractéres.")
                break;
            default:
                setAuthMessage("Erro interno. Contate o suporte ou tente novamente mais tarde.")
                break;
        }

        return false
    }

    async function handleCreateUserWithProvider (authProvider) {
        let provider = null
        
        if (authProvider === AuthProviders.GOOGLE) {
            provider = new GoogleAuthProvider()
        } else if (authProvider === AuthProviders.FACEBOOK) {
            provider = new FacebookAuthProvider()
        }

        const auth = getAuth()

        try {
            const credentials = await signInWithPopup(auth, provider)

            return credentials.user
            
        } catch (error) {
            FirebaseErrorHandler(error)
        }
    }

    async function handleCreateUserWithEmailPassword (email, password) {

        try {
            const auth = getAuth(firebase)

            const credentials = await createUserWithEmailAndPassword(auth, email, password)

            return credentials.user

        } catch (error) {
            FirebaseErrorHandler(error)
        }
    }

    return ( 
        <AuthContext.Provider
            value={{
                handleCreateUserWithEmailPassword,
                handleCreateUserWithProvider,
                authMessage,
                authMessageType
            }}
        >
            { children }
        </AuthContext.Provider>
        
    )
}

export default AuthContext;
