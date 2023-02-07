import dbConnect from '../../../../db/connect';
import Service from '../../../../models/Service';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedService from '../../../utils/NormalizedService';
import { serviceIsInvalid, userIsInvalid } from '../../../utils/Helpers';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';

async function serviceIsDuplicated (req) {

    const body = JSON.parse(req.body)

    const userExists = await Service.find({service_name: body.service_name, 'tutor._id': body.tutor._id, date: body.date}).exec()

    if (userExists.length > 0) {
        let error = Conflict()
        error = {...error, details: `Service ${body.service_name} for Tutor ${body.tutor.name} on this date already exists`}
        
        return error
    }

    return false
}

async function createService (res, service) {
    try {
        const result = await Service.create(service)

        return res.json({ response: { status: 201, message: "success"}, data: NormalizedService(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function updateService (res, service) {
    try {
        const newService = await Service.findByIdAndUpdate(service._id, service, { returnDocument: "after" }).select('-__v')

        return res.json({ response: { status: 200, message: "success"}, data: NormalizedService(newService) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function deleteService (res, serviceId) {
    try {

        await Service.findByIdAndDelete(serviceId)

        return res.json({ response: { status: 200, message: "success"}, data: [] })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function getService (res, service_id) {

    try {
        const result = await Service.findById(service_id).exec()

        if (!result) {
            error = NotFound()
            error = {...error, detail: `Service with ID: ${service_id} not found`}
            
            return res.json(error)
        }

        return res.json({ response: {status: 200, message: "success"}, data: NormalizedService(result) })

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
    const serviceId = req.query.serviceId

    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const postPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const putPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const deletePermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]

    let invalid = null;
    let duplicated = null;
    let service = null;
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
                
                if (!serviceId) {
                    error = BadRequest()
                    error = {...error, detail: `Service ID is mandatory`}
                    
                    return res.json(error)
                }
                                    
                await getService(res, serviceId)
            
            } else {
                error = NotAuthorized()
        
                return res.json(error)
            }
            
            break;
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {
                // Valida campos obrigatórios
                invalid = serviceIsInvalid(req)

                if (invalid) return res.json(invalid)

                // Valida duplicidade de serviço
                duplicated = await serviceIsDuplicated(req)

                if (duplicated) return res.json(duplicated)

                // Cria novo serviço
                const reqService = JSON.parse(req.body)

                service = new Service({
                    _id: reqService.id,
                    service_name: reqService.service_name,
                    date: reqService.date,
                    tutor: reqService.tutor,
                    breed: reqService.breed,
                    specie: reqService.specie,
                    description: reqService.description ?? "",
                    simptoms: reqService.simptoms ?? "",
                    is_confirmed: reqService.is_confirmed
                })

                await createService(res, service)

            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }

            break;
        case "PUT":
            hasPermission = ValidateAccess(profile.profile, putPermissions)

            if (hasPermission) {

                // Valida campos obrigatórios
                invalid = serviceIsInvalid(req)

                if (invalid) return res.json(invalid)

                //Edita usuário
                const reqService = JSON.parse(req.body)

                service = new Service({
                    _id: reqService.id,
                    service_name: reqService.service_name,
                    date: reqService.date,
                    tutor: reqService.tutor,
                    breed: reqService.breed,
                    specie: reqService.specie,
                    description: reqService.description ?? "",
                    simptoms: reqService.simptoms ?? "",
                    is_confirmed: reqService.is_confirmed
                })

                await updateService(res, service)
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
                            
            break;
        case "DELETE":
            hasPermission = ValidateAccess(profile.profile, deletePermissions)

            if (hasPermission) { 
                await deleteService(res, serviceId)
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