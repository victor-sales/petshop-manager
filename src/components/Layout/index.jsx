import Cookies from "js-cookie"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useAuthContext from "../../hooks/useAuthContext"
import Header from "../Header"

export default function Layout (props) {
    
    const router = useRouter()

    const { token } = useAuthContext()
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        async function validate () {
            
            if (!Cookies.get("logged-in")) {
                setIsLoggedIn(false)
                await router.push("/login")
            } else {
               setIsLoggedIn(true)
            }
            
        }

        validate()

        //eslint-disable-next-line
    }, [token])

    return (
        <>
            {isLoggedIn?
                <>
                    <Head>
                        <title>Petshop Manager</title>
                        <link rel="icon" href=""/>
                        
                    </Head>
                    <div className="bg-gray-300 min-w-full min-h-screen">
                        <Header />
                        <div className="flex items-center pt-2 justify-center">
                            {props.children}
                        </div>
                    </div>
                </> : 
                <></>
            }
                
        </>
    )
}