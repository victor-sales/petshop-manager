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

export function animalIsInvalid (req) {

    let error = BadRequest()

    if (!req?.body) {
        error = {...error, details: "Body not found"}

        return error
    } 

    const body = JSON.parse(req.body)
    
    if (!body.animal_name) {
        error = {...error, details: "Tutor is required"}
        
        return error
    }

    if (!body.tutor) {
        error = {...error, details: "Tutor is required"}
        
        return error
    }

    if (!body.breed) {
        error = {...error, details: "Breed is required"}
        
        return error
    }
    if (!body.specie) {
        error = {...error, details: "Specie is required"}
        
        return error
    }

    return false
}

export function specieIsInvalid (req) {

    let error = BadRequest()

    if (!req?.body) {
        error = {...error, details: "Body not found"}

        return error
    } 

    const body = JSON.parse(req.body)
    
    if (!body.specie_name) {
        error = {...error, details: "Specie name is required"}
        
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

export function checkAnimalNameValidity (value, setError) {
        if (!value) {
            setError("Nome não pode ser vazio.")
            return false
        }

        return true
}

export function checkTutorValidity (value, setError) {
    if (!value) {
        setError("Tutor não pode ser vazio")
        return false
    }
    return true
}

export function checkSpecieValidity (value, setError) {
    if (!value) {
        setError("Espécie não pode ser vazia.")
        return false
    }

    return true
}

export function checkBreedValidity (value, setError) {
    if (!value) {
        setError("Raça não pode ser vazia.")
        return false
    }

    return true
}

export function checkSpecieNameValidity (value, setError) {
    if (!value) {
        setError("Nome não pode ser vazio.")
        return false
    }

    return true
}
