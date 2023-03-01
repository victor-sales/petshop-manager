import admin from './FirebaseAdmin/FirebaseAdmin';

function getExpirationTime (token_exp) {
    const unixTime = new Date('1970-01-01T00:00:00Z')
    
    return new Date(unixTime.setUTCSeconds(token_exp))
}

export default async function ValidateAuthToken(token) {

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        const expirationTime = getExpirationTime(decodedToken.exp)
        const timeNow = new Date()

        if (expirationTime < timeNow) return false 

        return { profile: decodedToken.profile, id: decodedToken.user_id }

    } catch (error) {
        return false
    }
    
}
