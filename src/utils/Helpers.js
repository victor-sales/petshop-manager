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
        error = {...error, details: "Animal name is required"}
        
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

export function serviceIsInvalid (req) {

    let error = BadRequest()

    if (!req?.body) {
        error = {...error, details: "Body not found"}

        return error
    } 

    const body = JSON.parse(req.body)
    
    if (!body.service_name) {
        error = {...error, details: "Service name is required"}
        
        return error
    }

    if (!body.tutor) {
        error = {...error, details: "Tutor is required"}
        
        return error
    }

    if (!body.date) {
        error = {...error, details: "Date is required"}
        
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

    if (!body.simptoms) {
        error = {...error, details: "Simptoms are required"}
        
        return error
    }

    return false
}

export function productIsInvalid (req) {

    let error = BadRequest()

    if (!req?.body) {
        error = {...error, details: "Body not found"}

        return error
    } 

    const body = JSON.parse(req.body)
    
    if (!body.product_name) {
        error = {...error, details: "Product name is required"}
        
        return error
    }

    if (!body.brand) {
        error = {...error, details: "Brand is required"}
        
        return error
    }

    if (!body.type) {
        error = {...error, details: "Type is required"}
        
        return error
    }

    if (!body.price) {
        error = {...error, details: "Price is required"}
        
        return error
    }

    if (!body.amount) {
        error = {...error, details: "Amount is required"}
        
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

export function breedIsInvalid (req) {

    let error = BadRequest()

    if (!req?.body) {
        error = {...error, details: "Body not found"}

        return error
    } 

    const body = JSON.parse(req.body)
    
    if (!body.breed_name) {
        error = {...error, details: "Breed name is required"}
        
        return error
    }

    if (!body.specie) {
        error = {...error, details: "Specie is required"}
        
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
        setError("Espécie não pode ser vazia.")
        return false
    }

    return true
}

export function checkBreedNameValidity (value, setError) {
    if (!value) {
        setError("Raça não pode ser vazia.")
        return false
    }

    return true
}

export function checkServiceNameValidity (value, setError) {
    if (!value) {
        setError("Serviço não pode ser vazio.")
        return false
    }

    return true
}

export function checkSimptomsValidity (value, setError) {
    if (!value) {
        setError("Sintomas não pode ser vazio.")
        return false
    }

    return true
}
export function checkDateValidity (value, setError) {
    if (!value) {
        setError("Data não pode ser vazia.")
        return false
    }

    return true
}

export function checkProductNameValidity(value, setError) {
    if (!value) {
        setError("Nome do produto não pode ser vazio.")
        return false
    }

    return true
}

export function checkBrandValidity(value, setError) {
    if (!value) {
        setError("Marca não pode ser vazia.")
        return false
    }

    return true
}

export function checkTypeValidity(value, setError) {
    if (!value) {
        setError("Tipo não pode ser vazio.")
        return false
    }

    return true
}

export function checkPriceValidity(value, setError) {
    if (!value) {
        setError("Preço não pode ser zerado.")
        return false
    }

    return true
}

export function checkAmountValidity(value, setError) {
    if (!value) {
        setError("Quantidade não pode ser zerado.")
        return false
    }

    return true
}
