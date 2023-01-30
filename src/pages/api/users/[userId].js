import dbConnect from '../../../../db/connect';
import User from '../../../../models/User';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedUser from '../../../utils/NormalizedUser';
import { userIsInvalid } from '../../../utils/Helpers';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import axios from "axios"
import admin from '../../../utils/FirebaseAdmin/FirebaseAdmin';

async function userIsDuplicated (req) {

    const body = JSON.parse(req.body)
    const userExists = await User.find({email: body.email}).exec()

    if (userExists.length > 0) {
        let error = Conflict()
        error = {...error, details: `User ${body.email} already exists`}
        
        return error
    }

    return false
}

async function createUserOnFirebase ( body) {
    try {
        let user = await admin.auth().createUser({ uid: body.id, password: body.password ?? body.email, email: body.email, displayName: body.user_name, disabled: false})
        
        await admin.auth().setCustomUserClaims(user.uid, { profile: body.profile })

        return { response: { status: 201, message: "success"}, data: user }
    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return error
    }
}

async function updateUserOnFirebase (body) {
    try {        
        let user = await admin.auth().getUser(body.id)

        await admin.auth().setCustomUserClaims(user.uid, { profile: body.profile })
        
        return { response: { status: 200, message: "success"}, data: body}
    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return error
    }
}

export async function createUser (res, user) {
    try {
        const result = await User.create(user)

        return res.json({ response: { status: 201, message: "success"}, data: NormalizedUser(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

export async function updateUser (res, user) {
    try {
        const oldUser = await User.findById(user._id).exec()
        const newUser = await User.findByIdAndUpdate(user._id, user, { returnDocument: "after" }).select('-__v')

        if (oldUser.profile !== newUser.profile) {
            let user = await updateUserOnFirebase(newUser)
            
            return res.json(user)
        }
           
        return res.json({ response: { status: 200, message: "success"}, data: NormalizedUser(newUser) })
        

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

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

    if (headers["action-type"] !== "SIGNUP") {
        
        if (!headers["access-token"]) {
            error = NotAuthorized()
            
            return res.json(error)
    
        }
    }  
   
    switch (method) {
        case "GET":
            if (!userId) {
                error = BadRequest()
                error = {...error, detail: `User ID is mandatory`}
                
                return res.json(error)
            }
            
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
            invalid = userIsInvalid(req)

            if (invalid) return res.json(invalid)

            // Valida duplicidade de usuários
            duplicated = await userIsDuplicated(req)

            if (duplicated) return res.json(duplicated)

            // Cria novo usuário
            const reqUser = JSON.parse(req.body)

            // Valida se a conta esta sendo criada via provedor
            if (!reqUser.isProvider) {
                const firebaseResponse = await createUserOnFirebase(reqUser)
                
                if (firebaseResponse.response?.status === 201) {
                    
                    user = new User({
                        _id: firebaseResponse.data.uid, 
                        user_name: firebaseResponse.data.displayName, 
                        email: firebaseResponse.data.email, 
                        phone_number: firebaseResponse.data.phone_number ?? "", 
                        profile: reqUser.profile, 
                        role: reqUser.role
                    })
    
                    await createUser(res, user)

                } else {
                    return res.json(firebaseResponse)
                }
            } else {
                const firebaseResponse = await updateUserOnFirebase(reqUser)

                if (firebaseResponse.response?.status === 200) {
                    user = new User({
                        _id: reqUser.id, 
                        user_name: reqUser.user_name, 
                        email: reqUser.email, 
                        phone_number: reqUser.phone_number ?? "", 
                        profile: reqUser.profile, 
                        role: reqUser.role
                    })

                    await createUser(res, user)

                } else {
                    return res.json(firebaseResponse)
                }
            }
  
            break;
        case "PUT":
            // Valida campos obrigatórios
            invalid = userIsInvalid(req)
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

            await updateUser(res, user)
                            
            break;
        case "DELETE":
            result = await User.findByIdAndDelete(userId)
            return res.json({ response: { status: 200, message: "success" }, data: []})

            break;
        default:
            error = MethodNotFound(method)
            res.json(error)
            break;
    }
    
}