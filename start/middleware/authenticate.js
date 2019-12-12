const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const tokenKey = require('../config/keys_dev').secretOrKey

const authenticateUser= async (req,res,next) =>{
    try{
        
        const token = await jwt.verify((req.headers.authorization.split(' '))[1],tokenKey);
        if(!token){ 
            return res.status(401).send({
                msg: "noh"
            });
        }

        const allegedUser = await jwt.verify((req.headers.authorization.split(' '))[1],tokenKey);
        const confirmedUser = await User.findOne({_id: allegedUser.id});
        console.log(confirmedUser);
        req.user = confirmedUser;
        next();
    }catch(err){
        return res.json({err})
        };
    }
    



module.exports = authenticateUser
