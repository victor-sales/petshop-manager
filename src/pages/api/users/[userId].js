import dbConnect from '../../../../db/connect';
import User from '../../../../models/User';

export default async function handler (req, res) {
    
    await dbConnect()

    const headers = req.headers

    if (headers["access-token"]) {
        res.json({status: 401, message: "Not authorized"})
    } else {
        let result = null;
        const method = req.method
        const userId = req.query.userId

        console.log(method, userId)
        switch (method) {
            case "GET":
                result = await User.findById(userId).exec()
                
                if (!result) {
                    res.json({status: 404, message: "User not found"})
                }

                res.json({ response: {status: 200, message: "success"}, data: [result] })
                

                // getUserById
                break;
            case "POST":
                const body = JSON.parse(req.body)
                console.log(req)
                console.log(body)
                let result = await User.create(body)
                res.json({ response: {status: 200, message: "success"}, data: [result] })
                // createUser
                break;
            case "PUT":
                // EDITuSER
                break;
            default:
                res.json({status: 405, message: `Method ${method} not found`})
                break;
        }
    }
}