import Internal from "../../../utils/ErrorsObj/Internal";
import admin from "../../../utils/FirebaseAdmin/FirebaseAdmin";

export default async function handler (req, res) {
    
    const method = req.method

    let error = null
    
    switch (method) {
        case "POST":

        const body = JSON.parse(req.body)

            try {
                let user = await admin.auth().createUser({ uid: body.id, password: body.password ?? body.email, email: body.email, displayName: body.user_name, disabled: false})
                
                await admin.auth().setCustomUserClaims(user.uid, { profile: body.profile })

                return res.json({ response: { status: 201, message: "success"}, data: user })
            } catch (e) {
                
                error = Internal()
                error = {...error, details: e.message}
                
                return res.json(error)
            }
            break;
    
        default:
            break;
    }

}
