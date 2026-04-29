const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function authMiddlerwear(req,res,next){

    let token = req.cookies.token

    // Also check Authorization header for Bearer token
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            message: "Unauthorized user please login first"
        })
    }



    try {
        
         const decoded = jwt.verify(token,process.env.jwt_secrate_key)
    const user = await userModel.findOne({
        _id:decoded.id
    })
    req.user = user
    next()

    } catch (error) {
        return res.status(401).json({
            message:"Invalid token try again"
        })
    }

   
}

module.exports = authMiddlerwear