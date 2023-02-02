import dbConnect from '../../../../db/connect';
import Breed from '../../../../models/Breed';
import Specie from '../../../../models/Specie';
import { UserProfiles } from '../../../utils/Enums';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedBreed from '../../../utils/NormalizedBreed';
import NormalizedSpecie from '../../../utils/NormalizedSpecie';
import ValidateAccess from '../../../utils/ValidateAccess';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';

async function getBreeds (res) {
    let result = null;

    try {
        result = await Breed.find().exec()

        if (result.length > 0) result = result.map(e => NormalizedBreed(e))

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
    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    
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
        await getBreeds(res)
        
    } else {
        error = NotAuthorized()
            
        return res.json(error)
    }

}