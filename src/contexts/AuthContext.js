import { createContext, useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth"
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

    const [emailSent, setEmailSent] = useState(false)
    const [loadingEmailSent, setLoadingEmailSent] = useState(false)

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
        
        if (firebaseUser) {
            setToken(firebaseUser.accessToken)
            return true
        } 
        setToken(null)
        return false
    }

    function manageSession (firebaseUser, exit) {
        if (!Cookies.get("logged-in")) {
            if (firebaseUser) {
                Cookies.set("logged-in", "true", { expires: 7 })
                return true
            } else {
                Cookies.remove("logged-in")
                return false
            }
        } else {
            if (exit) { 
                Cookies.remove("logged-in")
                return false
            }
        }
    }

    function handleUserAndSession (firebaseUser, isLogin = false, exit = false) {

        manageUser(firebaseUser)
        manageSession(firebaseUser, exit)
        console.log("teste")
        if (firebaseUser && isLogin) Router.push("/")
        
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
            
            handleUserAndSession(credentials.user, true)

        } catch (error) {
            FirebaseErrorHandler(error)
        }
    }

    async function handleSignOut () {
       
        try {
            const auth = getAuth()
            
            await signOut(auth)
            handleUserAndSession(null, false, true)
        } catch (error) {
            FirebaseErrorHandler(error)
        }
        
    }

    async function handleResetPassword (email) {
        try {
            setLoadingEmailSent(true)
            const auth = getAuth()
            
            await sendPasswordResetEmail(auth, email)
            setEmailSent(true)
            setLoadingEmailSent(false)
            setAuthMessageType(MessageTypes.SUCCESS)
            setAuthMessage(`Um link para redefinição de senha foi enviado para ${email}`)
        } catch (error) {
            FirebaseErrorHandler(error)
        }

        setLoadingEmailSent(false)

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
        checkIfUserIsLoggedIn()
        //eslint-disable-next-line
    }, [])

    return ( 
        <AuthContext.Provider
            value={{
                handleCreateUserWithEmailPassword,
                handleConnectUserWithProvider,
                handleSignInWithEmailPassword,
                handleUserAndSession,
                handleSignOut,
                handleResetPassword,
                authMessage, setAuthMessage,
                authMessageType, setAuthMessageType,
                emailSent, setEmailSent,
                loadingEmailSent,
                token
            }}
        >
            { children }
        </AuthContext.Provider>
        
    )
}

export default AuthContext;
