const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const tokenKey = require('../config/keys_dev').secretOrKey

const authenticateUser= async (req,res,next) =>{
    try{
        
        const token = await jwt.verify((req.headers.authorization.split(' '))[1],tokenKey);
        if(!token){ 
            console.log("soso")
            return res.status(401).send({
                msg: "unauthorized"
            });
        }

        const allegedUser = await jwt.verify((req.headers.authorization.split(' '))[1],tokenKey);
        const confirmedUser = await User.findOne({_id: allegedUser.id});
        console.log(confirmedUser);
        req.user = confirmedUser;
        next();
    }catch(err){
        return res.json({err})
       // console.log(err)
        //return res.status(401).send({
         //   msg: "unauthorized"
        };
    }
    



module.exports = authenticateUser
