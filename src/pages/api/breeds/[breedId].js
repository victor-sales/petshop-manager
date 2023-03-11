import dbConnect from '../../../../db/connect';
import Breed from '../../../../models/Breed';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedBreed from '../../../utils/NormalizedBreed';
import { breedIsInvalid } from '../../../utils/Helpers';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';

async function breedIsDuplicated (req) {

    const body = JSON.parse(req.body)

    const breed = await Breed.find({breed_name: body.breed_name, 'specie._id': body.specie._id}).exec()

    if (breed.length > 0) {
        let error = Conflict()
        error = {...error, details: `Breed ${body.breed_name} of Specie ${body.specie.name} already exists`}
        
        return error
    }

    return false
}

async function createBreed (res, breed) {
    try {
        const result = await Breed.create(breed)

        return res.json({ response: { status: 201, message: "success"}, data: NormalizedBreed(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function updateBreed (res, breed) {
    try {
        const newBreed = await Breed.findByIdAndUpdate(breed._id, breed, { returnDocument: "after" }).select('-__v')

        return res.json({ response: { status: 200, message: "success"}, data: NormalizedBreed(newBreed) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function deleteBreed (res, breedId) {
    try {

        await Breed.findByIdAndDelete(breedId)

        return res.json({ response: { status: 200, message: "success"}, data: [] })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function getBreed (res, breed_id) {

    try {
        const result = await Breed.findById(breed_id).exec()

        if (!result) {
            error = NotFound()
            error = {...error, detail: `Breed with ID: ${breed_id} not found`}
            
            return res.json(error)
        }

        return res.json({ response: {status: 200, message: "success"}, data: NormalizedBreed(result) })

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
    const breedId = req.query.breedId

    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const postPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const putPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const deletePermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]

    let invalid = null;
    let duplicated = null;
    let breed = null;
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
                
                if (!breedId) {
                    error = BadRequest()
                    error = {...error, detail: `Breed ID is mandatory`}
                    
                    return res.json(error)
                }
                                    
                await getBreed(res, breedId)
            
            } else {
                error = NotAuthorized()
        
                return res.json(error)
            }
            
            break;
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {

                invalid = breedIsInvalid(req)

                if (invalid) return res.json(invalid)

                duplicated = await breedIsDuplicated(req)

                if (duplicated) return res.json(duplicated)

                const reqBreed = JSON.parse(req.body)

                breed = new Breed({
                    _id: reqBreed.id, 
                    breed_name: reqBreed.breed_name, 
                    specie: reqBreed.specie, 
                    description: reqBreed.description ?? ""
                })

                await createBreed(res, breed)

            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }

            break;
        case "PUT":
            hasPermission = ValidateAccess(profile.profile, putPermissions)

            if (hasPermission) {

                invalid = breedIsInvalid(req)

                if (invalid) return res.json(invalid)

                const reqBreed = JSON.parse(req.body)
                
                breed = new Breed({
                    _id: reqBreed.id, 
                    breed_name: reqBreed.breed_name, 
                    specie: reqBreed.specie, 
                    description: reqBreed.description ?? ""
                })

                await updateBreed(res, breed)
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
                            
            break;
        case "DELETE":
            hasPermission = ValidateAccess(profile.profile, deletePermissions)

            if (hasPermission) { 
                await deleteBreed(res, breedId)
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