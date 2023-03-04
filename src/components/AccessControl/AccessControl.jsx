import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { UserProfiles } from "../../utils/Enums"
import { useRouter } from "next/router";

export default function AccessControl ({token, ...props}) {
    
    const router = useRouter()
    const [allowed, setAllowed] = useState(false)

    const pagesCliente = ["/agendamento"]
    const pagesFuncionario = ["/animais", "/especies", "/produtos", "/racas", "/servicos", "/usuarios", "/vendas"]
    const pagesAdmin = ["/", "/agendamento", "/animais", "/especies", "/produtos", "/racas", "/servicos", "/usuarios", "/vendas"]

    // const allowedPages = [
    //     { profile: UserProfiles.CLIENTE, pages: pagesCliente },
    //     { profile: UserProfiles.FUNCIONARIO, pages: pagesFuncionario },
    //     { profile: UserProfiles.ADMIN, pages: pagesAdmin },
    // ]


    function verifyProfile () {
        const decoded = jwt_decode(token)
        const profile = decoded.profile
        console.log(profile)

        if (
            (profile.toUpperCase() === UserProfiles.CLIENTE && pagesCliente.some(e => e === router.pathname)) ||
            (profile.toUpperCase() === UserProfiles.FUNCIONARIO && pagesFuncionario.some(e => e === router.pathname)) ||
            (profile.toUpperCase() === UserProfiles.ADMIN && pagesAdmin.some(e => e === router.pathname))
        ) {
            setAllowed(true)
        } else {
            setAllowed(false)
        }
        console.log(router)
        console.log(decoded)
    }

    useEffect(() =>  {
        if (token) verifyProfile()
        //eslint-disable-next-line
    }, [token])

    return (
        allowed ? 
            props.children :
            <>NotAllowed</>
    )
}