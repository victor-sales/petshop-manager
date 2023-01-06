import { createContext, useEffect } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import firebase from "../utils/FirebaseConfig"

const AuthContext = createContext()

export function AuthProvider({children}) {

    const handleCreateUserWithEmailPassword = async (email, password) => {

        try {
            const auth = getAuth(firebase)

            const credentials = await createUserWithEmailAndPassword(auth, email, password)

            return credentials.user

            
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <AuthContext.Provider
            value={{
                handleCreateUserWithEmailPassword
            }}
        >
            { children }
        </AuthContext.Provider>
        
    )
}

export default AuthContext;
