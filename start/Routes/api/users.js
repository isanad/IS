const express = require('express')
const router = express.Router()
//const joi = require('joi')
const User = require('../../Models/User')
//const validator = require('../../Validation/eventValid')

  //post a user
 router.post("/", async (req, res) => {
    try {
       const user = await new User ({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        userType: req.body.userType
      }).save()
   return res.json({ data: user })
    }catch (error) {
      // We will be handling the error later
      console.log(error)
    }
})

 router.get("/", async (req, res) => {
   const users = await User.find();
   res.json({ data: users });
 });

  module.exports = router;