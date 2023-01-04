import dbConnect from '../../../../db/connect';
import User from '../../../../models/User';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedUser from '../../../utils/NormalizedUser';

function userIsInvalid (req) {

    let error = BadRequest()

    if (!req.body) {
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

async function duplicatedUser (req) {

    const body = JSON.parse(req.body)
    const userExists = await User.find({email: body.email}).exec()

    if (userExists.length > 0) {
        let error = Conflict()
        error = {...error, details: `User ${body.email} already exists`}
        
        return error
    }

    return false
}

export default async function handler (req, res) {
    
    await dbConnect()

    const headers = req.headers
    const method = req.method
    const userId = req.query.userId

    let result = null;
    let invalid = null;
    let duplicated = null;
    let user = null;
    let error = null

    if (!headers["access-token"]) {
        error = NotAuthorized()
        
        return res.json(error)

    } else {
        switch (method) {
            case "GET":
                result = await User.findById(userId).exec()
                
                if (!result) {
                    error = NotFound()
                    error = {...error, detail: `User with ID: ${userId} not found`}
                    
                    return res.json(error)
                }

                res.json({ response: {status: 200, message: "success"}, data: NormalizedUser(result) })

                break;
            case "POST":

                // Valida campos obrigatórios
                invalid = userIsInvalid(req, res)
                
                if (invalid) return res.json(invalid)

                // Valida duplicidade de usuários
                duplicated = await duplicatedUser(req, res)

                if (duplicated) return res.json(duplicated)

                // Cria novo usuário
                user = JSON.parse(req.body)

                user = new User({
                    _id: user.id, 
                    user_name: user.user_name, 
                    email: user.email, 
                    phone_number: user.phone_number, 
                    profile: user.profile, 
                    role: user.role
                })

                result = await User.create(user)

                res.json({ response: { status: 201, message: "success"}, data: NormalizedUser(result) })

                break;
            case "PUT":
                // Valida campos obrigatórios
                invalid = userIsInvalid(req, res)
                
                if (invalid) return res.json(invalid)

                //Edita usuário
                user = JSON.parse(req.body)

                user = new User({
                    _id: user.id, 
                    user_name: user.user_name, 
                    email: user.email, 
                    phone_number: user.phone_number, 
                    profile: user.profile, 
                    role: user.role
                })

                result = await User.findByIdAndUpdate(userId, user, { returnDocument: "after" })

                res.json({ response: { status: 200, message: "success"}, data: NormalizedUser(result) })
                                
                break;
            default:
                error = MethodNotFound(method)
                res.json(error)
                break;
        }
    }
}