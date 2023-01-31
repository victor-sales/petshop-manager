import dbConnect from '../../../../db/connect';
import User from '../../../../models/User';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedUser from '../../../utils/NormalizedUser';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';

export default async function handler (req, res) {

    await dbConnect()

    const headers = req.headers;

    let result = null;
    let error = null;

    if (!headers["access-token"]) {
        error = NotAuthorized()
        
        return res.json(error)

    } else {
        await ValidateAuthToken(headers["access-token"])
    }

    result = await User.find().exec()

    if (result.length > 0) result = result.map(e => NormalizedUser(e))

    return res.json({ response: { status: 200, message: "success"}, data: result })


}