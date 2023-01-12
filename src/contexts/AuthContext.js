import { createContext, useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import firebase from "../utils/FirebaseConfig"
import { FirebaseError } from "firebase/app"
import { AuthProviders, MessageTypes } from "../utils/Enums"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const AuthContext = createContext()

export function AuthProvider({children}) {

    const Router = useRouter()

    const [authMessage, setAuthMessage] = useState("")
    const [authMessageType, setAuthMessageType] = useState("")
    const [token, setToken] = useState(null)

    function FirebaseErrorHandler (error) {

        setAuthMessageType(MessageTypes.ERROR)

        switch (error.code) {
            case "auth/email-already-in-use":
                setAuthMessage("E-mail já está em uso.")
                break;
            case "auth/wrong-password":
                setAuthMessage("E-mail ou Senha incorretos.")
                break;
            case "auth/network-request-failed":
                setAuthMessage("Erro na rede. Verifique sua conexão com a internet.")
                break;
            case "auth/weak-password":
                setAuthMessage("Senha fraca. Sua senha precisa conter pelo menos 6 caractéres.")
                break;
            case "auth/invalid-email":
                setAuthMessage("Este e-mail é inválido.")
                break;
            case "auth/user-not-found": 
                setAuthMessage("Usuário não encontrado")
                break;
            case "auth/popup-closed-by-user": 
                setAuthMessage("A janela foi fechada antes da conclusão do LOGIN")
                break
            default:
                setAuthMessage("Erro interno. Contate o suporte ou tente novamente mais tarde.")
                break;
        }

        return false
    }

    function manageUser (firebaseUser) {
        
        if (firebaseUser) setToken(firebaseUser.accessToken)
        else setToken(null)
    }

    function manageSession (firebaseUser) {
        if (!Cookies.get("logged-in")) {
            
            if (firebaseUser) {

                Cookies.set("logged-in", true), { expires: 7 }
            } else {
                
                Cookies.remove("logged-in")
            }
        }
        
    }

    function handleUserAndSession (firebaseUser) {
        manageUser(firebaseUser)
        manageSession(firebaseUser)

        Router.push("/")
        
    }

    async function handleConnectUserWithProvider (authProvider) {
        let provider = null
        
        if (authProvider === AuthProviders.GOOGLE) {
            provider = new GoogleAuthProvider()
        } else if (authProvider === AuthProviders.FACEBOOK) {
            provider = new FacebookAuthProvider()
        }

        provider.setCustomParameters({
            prompt: "select_account"
        })

        const auth = getAuth()

        try {
            const credentials = await signInWithPopup(auth, provider)
            
            if (credentials) return credentials.user
            
        } catch (error) {
            FirebaseErrorHandler(error)
            return false
            
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

    async function handleSignInWithEmailPassword (email, password) {
        
        try {
            const auth = getAuth()

            const credentials = await signInWithEmailAndPassword(auth, email, password)
            
            handleUserAndSession(credentials.user)

        } catch (error) {
            FirebaseErrorHandler(error)
        }
    }

    async function handleSignOut () {
       
        try {
            const auth = getAuth()

            await signOut(auth)

        } catch (error) {
            FirebaseErrorHandler(error)
        }
        
    }

    async function checkIfUserIsLoggedIn() {
        
        try {
            const auth = getAuth()
            onAuthStateChanged(auth, handleUserAndSession)

        } catch (error) {
            FirebaseErrorHandler(error)
        }
    }

    useEffect(() => {
        // checkIfUserIsLoggedIn()
        //eslint-disable-next-line
    }, [])

    return ( 
        <AuthContext.Provider
            value={{
                handleCreateUserWithEmailPassword,
                handleConnectUserWithProvider,
                handleSignInWithEmailPassword,
                handleUserAndSession,
                authMessage, setAuthMessage,
                authMessageType, setAuthMessageType,
                token
            }}
        >
            { children }
        </AuthContext.Provider>
        
    )
}

export default AuthContext;
