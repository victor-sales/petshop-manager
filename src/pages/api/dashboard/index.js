import dbConnect from '../../../../db/connect';
import Breed from '../../../../models/Breed';
import Sell from '../../../../models/Sell';
import Service from '../../../../models/Service';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedBreed from '../../../utils/NormalizedBreed';
import NormalizedSell from '../../../utils/NormalizedSell';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { DashboardNames, UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';

function dashValid (dashName) {
    return Object.values(DashboardNames).some(e => e === dashName)
}

async function getData (res, dash_name) {

    let result = []
    try {

        switch (dash_name) {
            case DashboardNames.LAST_SELLS:
                result = await Sell.find().sort({date: -1}).limit(5).exec()

                if (result.length) result = result.map(e => NormalizedSell(e))

                break;
            case DashboardNames.SCHEDULED_VS_CONFIRMED:
                const confirmed = await Service.countDocuments({is_confirmed: true})
                const not_confirmed = await Service.countDocuments({is_confirmed: false})

                result = { confirmed: confirmed, not_confirmed: not_confirmed }

                break;
        
            default:
                break;
        }


        return res.json({ response: {status: 200, message: "success"}, data: result })

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

    const postPermissions = [UserProfiles.ADMIN]

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
        
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {
                
                const body = JSON.parse(req.body ?? {})

                const isValid = dashValid(body?.dash_name)

                if (!isValid) {
                    let error = BadRequest()
                    error = {...error, details: "Dashname invalid"}
                    return res.json(error)
                }

                await getData(res, body?.dash_name)

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