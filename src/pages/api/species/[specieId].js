import dbConnect from '../../../../db/connect';
import Specie from '../../../../models/Specie';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedSpecie from '../../../utils/NormalizedSpecie';
import { specieIsInvalid } from '../../../utils/Helpers';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';

async function specieIsDuplicated (req) {

    const body = JSON.parse(req.body)

    const specie = await Specie.find({specie_name: body.specie_name}).exec()

    if (specie.length > 0) {
        let error = Conflict()
        error = {...error, details: `Specie ${body.specie_name} already exists`}
        
        return error
    }

    return false
}

async function createSpecie (res, specie) {
    try {
        const result = await Specie.create(specie)

        return res.json({ response: { status: 201, message: "success"}, data: NormalizedSpecie(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function updateSpecie (res, specie) {
    try {
        const newSpecie = await Specie.findByIdAndUpdate(specie._id, specie, { returnDocument: "after" }).select('-__v')

        return res.json({ response: { status: 200, message: "success"}, data: NormalizedSpecie(newSpecie) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function deleteSpecie (res, specieId) {
    try {

        await Specie.findByIdAndDelete(specieId)

        return res.json({ response: { status: 200, message: "success"}, data: [] })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function getSpecie (res, specieId) {

    try {
        const result = await Specie.findById(specieId).exec()

        if (!result) {
            error = NotFound()
            error = {...error, detail: `Specie with ID: ${specieId} not found`}
            
            return res.json(error)
        }

        return res.json({ response: {status: 200, message: "success"}, data: NormalizedSpecie(result) })

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
    const specieId = req.query.specieId

    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const postPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const putPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const deletePermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]

    let invalid = null;
    let duplicated = null;
    let specie = null;
    let error = null;
    let profile = null;
    let hasPermission = false


    if (!headers["access-token"]) {
        error = NotAuthorized()
        
        return res.json(error)

    } else {
        profile = await ValidateAuthToken(headers["access-token"])

        if (!profile) return res.json(error)
    }
    
    switch (method) {
        case "GET":
        
            hasPermission = ValidateAccess(profile.profile, getPermissions)

            if (hasPermission) {
                
                if (!specieId) {
                    error = BadRequest()
                    error = {...error, detail: `Specie ID is mandatory`}
                    
                    return res.json(error)
                }
                                    
                await getSpecie(res, specieId)
            
            } else {
                error = NotAuthorized()
        
                return res.json(error)
            }
            
            break;
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {

                invalid = specieIsInvalid(req)

                if (invalid) return res.json(invalid)

                duplicated = await specieIsDuplicated(req)

                if (duplicated) return res.json(duplicated)

                const reqSpecie = JSON.parse(req.body)

                specie = new Specie({
                    _id: reqSpecie.id, 
                    specie_name: reqSpecie.specie_name, 
                    description: reqSpecie.description ?? ""
                })

                await createSpecie(res, specie)

            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }

            break;
        case "PUT":
            hasPermission = ValidateAccess(profile.profile, putPermissions)

            if (hasPermission) {

                invalid = specieIsInvalid(req)

                if (invalid) return res.json(invalid)

                const reqSpecie = JSON.parse(req.body)

                specie = new Specie({
                    _id: reqSpecie.id, 
                    specie_name: reqSpecie.specie_name, 
                    description: reqSpecie.description ?? ""
                })

                await updateSpecie(res, specie)
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
                            
            break;
        case "DELETE":
            hasPermission = ValidateAccess(profile.profile, deletePermissions)

            if (hasPermission) { 
                await deleteSpecie(res, specieId)
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
            break;
        default:
            error = MethodNotFound(method)
            res.json(error)
            break;
    }
    
}