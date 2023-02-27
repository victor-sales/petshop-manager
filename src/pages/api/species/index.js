import dbConnect from '../../../../db/connect';
import Specie from '../../../../models/Specie';
import { UserProfiles } from '../../../utils/Enums';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedSpecie from '../../../utils/NormalizedSpecie';
import ValidateAccess from '../../../utils/ValidateAccess';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';

async function getSpecies (res) {
    let result = null;

    try {
        result = await Specie.find().exec()

        if (result.length > 0) result = result.map(e => NormalizedSpecie(e))

        return res.json({ response: { status: 200, message: "success"}, data: result })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }
}

export default async function handler (req, res) {

    await dbConnect()

    const headers = req.headers;
    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO, UserProfiles.CLIENTE]
    
    let error = null;
    let profile = null;
    let hasPermission = false;

    if (!headers["access-token"]) {
        error = NotAuthorized()
        
        return res.json(error)

    } else {
        profile = await ValidateAuthToken(headers["access-token"])

        if (!profile) return res.json(error)
    }

    hasPermission = ValidateAccess(profile.profile, getPermissions)

    if (hasPermission) {
        await getSpecies(res)
        
    } else {
        error = NotAuthorized()
            
        return res.json(error)
    }

}