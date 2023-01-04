export default function handler (req, res) {
    
    const headers = req.headers

    if (!headers["access-token"]) {
        res.json({status: 401, message: "Not authorized"})
    } else {
        res.status(200).json({
            data: [
                {id: 1, name: 'Victor'},
                {id: 2, name: 'Jordânia'},
                {id: 3, name: 'Geyza'},
            ]
        })
    }

   
}