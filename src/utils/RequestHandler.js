export default async function RequestHandler (accessToken, url, method, body, actionType) {
    
    let options = {
        headers: { 
            "access-token": accessToken ?? false,
            "action-type": actionType
        },
        method: method
    }

    if (body) {
        options = {...options, body: JSON.stringify(body)}
    } 

    let response = await fetch(url, options)
    
    response = await response.json()

    return response

}