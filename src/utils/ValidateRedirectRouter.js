import jwt_decode from "jwt-decode";
import { UserProfiles } from "./Enums";

export default async function ValidateRedirectRouter (token, router) {
    const str = token?.token ?? token
    
    if (str) {
        const decoded = jwt_decode(str)
        const profile = decoded.profile

        if (profile?.toUpperCase() === UserProfiles.ADMIN) await router.push("/")
        else if (profile?.toUpperCase() === UserProfiles.FUNCIONARIO) await router.push("/servicos")
        else if (profile?.toUpperCase() === UserProfiles.CLIENTE) await router.push("/agendamento")
    }
    
}