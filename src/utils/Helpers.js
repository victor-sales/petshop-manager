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

    return false
}