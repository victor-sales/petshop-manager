import dbConnect from '../../../../db/connect';
import User from '../../../../models/User';
import { UserProfiles } from '../../../utils/Enums';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedUser from '../../../utils/NormalizedUser';
import ValidateAccess from '../../../utils/ValidateAccess';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';

export default async function handler (req, res) {

    await dbConnect()

    const headers = req.headers;
    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO, UserProfiles.CLIENTE]

    let result = null;
    let error = null;
    let hasPermission = false;
    let profile = null

    if (!headers["access-token"]) {
        error = NotAuthorized()
        
        return res.json(error)

    } else {
        profile = await ValidateAuthToken(headers["access-token"])

        if (!profile) return res.json(error)
        
    }

    hasPermission = ValidateAccess(profile.profile, getPermissions)

    if (hasPermission) {

        result = await User.find({_id: profile.id}).exec()
        
        if (result.length > 0) {
            result = result.map(e => NormalizedUser(e))

            const [user] = result
            return res.json({ response: { status: 200, message: "success"}, data: user })

        } 

        return res.json({ response: { status: 200, message: "success"}, data: result })

    } else {
        error = NotAuthorized()
            
        return res.json(error)
    }

}