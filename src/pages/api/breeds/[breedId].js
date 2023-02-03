import dbConnect from '../../../../db/connect';
import Breed from '../../../../models/Animal';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedUser from '../../../utils/NormalizedUser';
import NormalizedAnimal from '../../../utils/NormalizedAnimal';
import { animalIsInvalid, userIsInvalid } from '../../../utils/Helpers';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';

async function animalIsDuplicated (req) {

    const body = JSON.parse(req.body)

    const userExists = await Animal.find({animal_name: body.animal_name, 'tutor._id': body.tutor._id}).exec()

    if (userExists.length > 0) {
        let error = Conflict()
        error = {...error, details: `Animal ${body.animal_name} of Tutor ${body.tutor.name} already exists`}
        
        return error
    }

    return false
}

async function createBreed (res, animal) {
    try {
        const result = await Breed.create(animal)

        return res.json({ response: { status: 201, message: "success"}, data: NormalizedBreed(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function updateBreed (res, animal) {
    try {
        const newBreed = await Breed.findByIdAndUpdate(animal._id, animal, { returnDocument: "after" }).select('-__v')

        return res.json({ response: { status: 200, message: "success"}, data: NormalizedBreed(newBreed) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function deleteBreed (res, animalId) {
    try {

        await Breed.findByIdAndDelete(animalId)

        return res.json({ response: { status: 200, message: "success"}, data: [] })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function getBreed (res, animal_id) {

    try {
        const result = await Breed.findById(animal_id).exec()

        if (!result) {
            error = NotFound()
            error = {...error, detail: `Breed with ID: ${animal_id} not found`}
            
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
    const animalId = req.query.animalId

    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const postPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const putPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const deletePermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]

    let invalid = null;
    let duplicated = null;
    let animal = null;
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
                
                if (!animalId) {
                    error = BadRequest()
                    error = {...error, detail: `Breed ID is mandatory`}
                    
                    return res.json(error)
                }
                                    
                await getBreed(res, animalId)
            
            } else {
                error = NotAuthorized()
        
                return res.json(error)
            }
            
            break;
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {
                // Valida campos obrigatórios
                invalid = animalIsInvalid(req)

                if (invalid) return res.json(invalid)

                // Valida duplicidade de usuários
                duplicated = await animalIsDuplicated(req)

                if (duplicated) return res.json(duplicated)

                // Cria novo usuário
                const reqBreed = JSON.parse(req.body)

                animal = new Breed({
                    _id: reqBreed.id, 
                    animal_name: reqBreed.animal_name, 
                    tutor: reqBreed.tutor, 
                    breed: reqBreed.breed, 
                    specie: reqBreed.specie, 
                    description: reqBreed.description ?? ""
                })

                await createBreed(res, animal)

            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }

            break;
        case "PUT":
            hasPermission = ValidateAccess(profile.profile, putPermissions)

            if (hasPermission) {

                // Valida campos obrigatórios
                invalid = animalIsInvalid(req)

                if (invalid) return res.json(invalid)

                //Edita usuário
                const reqBreed = JSON.parse(req.body)
                
                animal = new Breed({
                    _id: reqBreed.id, 
                    animal_name: reqBreed.animal_name, 
                    tutor: reqBreed.tutor, 
                    breed: reqBreed.breed, 
                    specie: reqBreed.specie, 
                    description: reqBreed.description ?? ""
                })

                await updateBreed(res, animal)
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
                            
            break;
        case "DELETE":
            hasPermission = ValidateAccess(profile.profile, deletePermissions)

            if (hasPermission) { 
                await deleteBreed(res, animalId)
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