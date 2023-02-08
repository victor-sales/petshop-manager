import dbConnect from '../../../../db/connect';
import Product from '../../../../models/Product';
import { UserProfiles } from '../../../utils/Enums';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedProduct from '../../../utils/NormalizedProduct';
import ValidateAccess from '../../../utils/ValidateAccess';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';

async function getProducts (res) {
    let result = null;

    try {
        result = await Product.find().exec()

        if (result.length > 0) result = result.map(e => NormalizedProduct(e))

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
        await getProducts(res)
        
    } else {
        error = NotAuthorized()
            
        return res.json(error)
    }

}