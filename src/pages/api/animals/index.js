import dbConnect from '../../../../db/connect';
import Animal from '../../../../models/Animal';
import { UserProfiles } from '../../../utils/Enums';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedAnimal from '../../../utils/NormalizedAnimal';
import ValidateAccess from '../../../utils/ValidateAccess';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';

export default async function handler (req, res) {

    await dbConnect()

    const headers = req.headers;
    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    
    let result = null;
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

        result = await Animal.find().exec()

        if (result.length > 0) result = result.map(e => NormalizedAnimal(e))

        return res.json({ response: { status: 200, message: "success"}, data: result })
    } else {
        error = NotAuthorized()
            
        return res.json(error)
    }

}