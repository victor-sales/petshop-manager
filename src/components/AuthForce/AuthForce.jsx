import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";

export default function AuthForce ({children}) {

    const Router = useRouter()
    const { token } = useAuthContext()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (!Cookies.get("logged-in")) {
            setIsLoggedIn(false)
            Router.push("/login")
        } else {
            setIsLoggedIn(true)
        }
        //eslint-disable-next-line
    }, [token])

    function Content () {
        return (
            <>
                <Head>
                    <title>Petshop Manager</title>
                    <link rel="icon" href=""/>
                    
                </Head>
                {children}
            </>
        )
            
    }

    if (isLoggedIn) {
        return <Content />
    } else {
        return false
    }
}