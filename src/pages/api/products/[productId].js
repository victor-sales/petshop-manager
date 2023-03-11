import dbConnect from '../../../../db/connect';
import Product from '../../../../models/Product';
import Conflict from '../../../utils/ErrorsObj/Conflict';
import NotFound from '../../../utils/ErrorsObj/NotFound';
import NotAuthorized from '../../../utils/ErrorsObj/NotAuthorized';
import NormalizedProduct from '../../../utils/NormalizedProduct';
import { productIsInvalid } from '../../../utils/Helpers';
import BadRequest from '../../../utils/ErrorsObj/BadRequest';
import Internal from '../../../utils/ErrorsObj/Internal';
import ValidateAuthToken from '../../../utils/ValidateAuthToken';
import { UserProfiles } from '../../../utils/Enums';
import ValidateAccess from '../../../utils/ValidateAccess';

async function productIsDuplicated (req) {

    const body = JSON.parse(req.body)

    const product = await Product.find({product_name: body.product_name, 'brand': body.brand}).exec()

    if (product.length > 0) {
        let error = Conflict()
        error = {...error, details: `Product ${body.product_name} of Brand ${body.brand} already exists`}
        
        return error
    }

    return false
}

async function createProduct (res, product) {
    try {
        const result = await Product.create(product)

        return res.json({ response: { status: 201, message: "success"}, data: NormalizedProduct(result) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function updateProduct (res, product) {
    try {
        const newProduct = await Product.findByIdAndUpdate(product._id, product, { returnDocument: "after" }).select('-__v')

        return res.json({ response: { status: 200, message: "success"}, data: NormalizedProduct(newProduct) })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function deleteProduct (res, productId) {
    try {

        await Product.findByIdAndDelete(productId)

        return res.json({ response: { status: 200, message: "success"}, data: [] })

    } catch (e) {
        let error = Internal()
        error = {...error, details: e.message}
        
        return res.json(error)
    }

}

async function getProduct (res, product_id) {

    try {
        const result = await Product.findById(product_id).exec()

        if (!result) {
            error = NotFound()
            error = {...error, detail: `Product with ID: ${product_id} not found`}
            
            return res.json(error)
        }

        return res.json({ response: {status: 200, message: "success"}, data: NormalizedProduct(result) })

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
    const productId = req.query.productId

    const getPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const postPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const putPermissions = [UserProfiles.ADMIN, UserProfiles.FUNCIONARIO]
    const deletePermissions = [UserProfiles.ADMIN]

    let invalid = null;
    let duplicated = null;
    let product = null;
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
                
                if (!productId) {
                    error = BadRequest()
                    error = {...error, detail: `Product ID is mandatory`}
                    
                    return res.json(error)
                }
                                    
                await getProduct(res, productId)
            
            } else {
                error = NotAuthorized()
        
                return res.json(error)
            }
            
            break;
        case "POST":

            hasPermission = ValidateAccess(profile.profile, postPermissions)

            if (hasPermission) {
                invalid = productIsInvalid(req)

                if (invalid) return res.json(invalid)

                duplicated = await productIsDuplicated(req)

                if (duplicated) return res.json(duplicated)

                const reqProduct = JSON.parse(req.body)

                product = new Product({
                    _id: reqProduct.id,
                    product_name: reqProduct.product_name,
                    type: reqProduct.type,
                    brand: reqProduct.brand,
                    price: reqProduct.price,
                    amount: reqProduct.amount,
                })

                await createProduct(res, product)

            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }

            break;
        case "PUT":
            hasPermission = ValidateAccess(profile.profile, putPermissions)

            if (hasPermission) {

                invalid = productIsInvalid(req)

                if (invalid) return res.json(invalid)

                const reqProduct = JSON.parse(req.body)
                
                product = new Product({
                    _id: reqProduct.id,
                    product_name: reqProduct.product_name,
                    type: reqProduct.type,
                    brand: reqProduct.brand,
                    price: reqProduct.price,
                    amount: reqProduct.amount,
                })

                await updateProduct(res, product)
            } else {
                error = NotAuthorized()
            
                return res.json(error)
            }
                            
            break;
        case "DELETE":
            hasPermission = ValidateAccess(profile.profile, deletePermissions)

            if (hasPermission) { 

                const reqProduct = JSON.parse(req.body)
                if (reqProduct.amount > 0) {
                    let error = Internal()

                    error = {...error, details: "You can't delete a product with more than 0 items" }

                    return res.json(error)
                }

                await deleteProduct(res, productId)
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