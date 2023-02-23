import dbConnect from '../../../../db/connect';
import Sell from '../../../../models/Sell';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedSell from '../../../utils/NormalizedSell';
import { sellIsInvalid } from '../../../utils/Helpers';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';


async function createSell (res, sell) {
    try {
        const result = await Sell.create(sell)

        return res.json({ response: { status: 201, message: "success"}, data: NormalizedSell(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function updateSell (res, sell) {
    try {
        const newSell = await Sell.findByIdAndUpdate(sell._id, sell, { returnDocument: "after" }).select('-__v')

        return res.json({ response: { status: 200, message: "success"}, data: NormalizedSell(newSell) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function deleteSell (res, sellId) {
    try {

        await Sell.findByIdAndDelete(sellId)

        return res.json({ response: { status: 200, message: "success"}, data: [] })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function getSell (res, sell_id) {

    try {
        const result = await Sell.findById(sell_id).exec()

        if (!result) {
            error = NotFound()
            error = {...error, detail: `Sell with ID: ${sell_id} not found`}
            
            return res.json(error)
        }

        return res.json({ response: {status: 200, message: "success"}, data: NormalizedSell(result) })

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
    const sellId = req.query.sellId

    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const postPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const putPermissions = [UserProfiles.ADMIN]
    const deletePermissions = [UserProfiles.ADMIN]

    let invalid = null;
    let sell = null;
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
                
                if (!sellId) {
                    error = BadRequest()
                    error = {...error, detail: `Sell ID is mandatory`}
                    
                    return res.json(error)
                }
                                    
                await getSell(res, sellId)
            
            } else {
                error = NotAuthorized()
        
                return res.json(error)
            }
            
            break;
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {
                // Valida campos obrigatórios
                invalid = sellIsInvalid(req)

                if (invalid) return res.json(invalid)

                // Cria novo usuário
                const reqSell = JSON.parse(req.body)
                
                sell = new Sell({
                    _id: reqSell.id,
                    date: reqSell.date,
                    cashier: reqSell.cashier,
                    buyer: reqSell.buyer,
                    product: reqSell.product,
                    amount: reqSell.amount,
                    sell_value: reqSell.sell_value,
                    observations: reqSell.observations ?? ""
                })

                await createSell(res, sell)

            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }

            break;
        case "PUT":
            hasPermission = ValidateAccess(profile.profile, putPermissions)

            if (hasPermission) {

                // Valida campos obrigatórios
                invalid = sellIsInvalid(req)

                if (invalid) return res.json(invalid)

                //Edita usuário
                const reqSell = JSON.parse(req.body)

                sell = new Sell({
                    _id: reqSell.id,
                    date: reqSell.date,
                    cashier: reqSell.cashier,
                    buyer: reqSell.buyer,
                    product: reqSell.product,
                    amount: reqSell.amount,
                    sell_value: reqSell.sell_value,
                    observations: reqSell.observations ?? ""
                })

                await updateSell(res, sell)
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
                            
            break;
        case "DELETE":
            hasPermission = ValidateAccess(profile.profile, deletePermissions)

            if (hasPermission) { 
                await deleteSell(res, sellId)
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