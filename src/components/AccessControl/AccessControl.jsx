import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import { UserProfiles } from "../../utils/Enums"
import { useRouter } from "next/router";
import { Spin } from "antd";
import AccessDenied from "../AccessDenied/AccessDenied";

export default function AccessControl ({token, ...props}) {
    
    const router = useRouter()
    const [allowed, setAllowed] = useState(false)
    const [loading, setLoading] = useState(true)

    const pagesCliente = ["/agendamento"]
    const pagesFuncionario = ["/animais", "/especies", "/produtos", "/racas", "/servicos", "/usuarios", "/vendas"]
    const pagesAdmin = ["/", "/agendamento", "/animais", "/especies", "/produtos", "/racas", "/servicos", "/usuarios", "/vendas"]

    function verifyProfile () {
        setLoading(true)
        
        const decoded = jwt_decode(token)
        const profile = decoded.profile

        if (
            (profile.toUpperCase() === UserProfiles.CLIENTE && pagesCliente.some(e => e === router.pathname)) ||
            (profile.toUpperCase() === UserProfiles.FUNCIONARIO && pagesFuncionario.some(e => e === router.pathname)) ||
            (profile.toUpperCase() === UserProfiles.ADMIN && pagesAdmin.some(e => e === router.pathname))
        ) {
            setAllowed(true)
        } else {
            setAllowed(false)
        }
       
        setLoading(false)
    }

    useEffect(() =>  {
        if (token) verifyProfile()
        //eslint-disable-next-line
    }, [token])

    return (
        <>
            {
                !loading ?
                    allowed ? 
                        props.children :
                        <AccessDenied /> :
                    <div className="absolute left-1/2 top-1/2">
                        <div className="relative -left-1/2">
                            <Spin />
                        </div>
                    </div>
            }
        </>
    )
}