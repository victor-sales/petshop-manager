import BadRequest from "./ErrorsObj/BadRequest"

export function userIsInvalid (req) {

    let error = BadRequest()

    if (!req?.body) {
        error = {...error, details: "Body not found"}

        return error
    } 

    const body = JSON.parse(req.body)
    
    if (!body.email) {
        error = {...error, details: "Email is required"}
        
        return error
    }

    if (!body.user_name) {
        error = {...error, details: "Username is required"}
        
        return error
    }

    return false
}

export const capitalizeFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export function checkUsernameValidity (value, setError) {
        if (!value) {
            setError("Nome não pode ser vazio.")
            return false
        }

        return true
    }

export function checkEmailValidity (value, setError) {
    if (!value) {
        setError("Email não pode ser vazio")
        return false
    }
    return true
}

export function checkProfileValidity (value, setError) {
    if (!value) {
        setError("Profile não pode ser vazio.")
        return false
    }

    return true
}

export function checkRoleValidity (value, setError) {
    if (!value) {
        setError("Função não pode ser vazia.")
        return false
    }

    return true
}
