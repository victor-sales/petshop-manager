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
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';

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

export async function getUser (res, user_id) {

    try {
        const result = await User.findById(user_id).exec()

        if (!result) {
            error = NotFound()
            error = {...error, detail: `User with ID: ${user_id} not found`}
            
            return res.json(error)
        }

        return res.json({ response: {status: 200, message: "success"}, data: NormalizedUser(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

export default async function handler (req, res) {

    // GET user** -> administrador, funcionario
    // POST user -> administrador, funcionario
    // PUT user -> administrador, funcionario

    // ** Se user_profile == cliente, ele poderá acessar apenas o próprio perfil
    
    await dbConnect()

    const headers = req.headers
    const method = req.method
    const userId = req.query.userId

    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const postPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const putPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]

    let invalid = null;
    let duplicated = null;
    let user = null;
    let error = null;
    let profile = null;
    let hasPermission = false

    if (headers["action-type"] !== "SIGNUP") {

        if (!headers["access-token"]) {
            error = NotAuthorized()
            
            return res.json(error)
    
        } else {
            profile = await ValidateAuthToken(headers["access-token"])

            if (!profile) return res.json(error)
        }
    }  
   
    switch (method) {
        case "GET":
        
            if (profile.profile.toLowerCase() === UserProfiles.CLIENTE.toLowerCase()) {

                await getUser(res, profile.id)

            } else {
                
                hasPermission = ValidateAccess(profile.profile, getPermissions)

                if (hasPermission) {
                    
                    if (!userId) {
                        error = BadRequest()
                        error = {...error, detail: `User ID is mandatory`}
                        
                        return res.json(error)
                    }
                                        
                    await getUser(res, userId)
                
                } else {
                    error = NotAuthorized()
            
                    return res.json(error)
                }
            }

            
            break;
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {
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
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }

            break;
        case "PUT":
            hasPermission = ValidateAccess(profile.profile, putPermissions)

            if (hasPermission) {

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
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
                            
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