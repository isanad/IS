const express = require('express')
const router = express.Router()
//const joi = require('joi')
const User = require('../../Models/User')
const authenticateUser = require('../../middleware/authenticate')
const Grade = require('../../Models/Grade')

//const validator = require('../../Validation/eventValid')

  //post a grade
 router.post  ("/", async (req, res) => {
    try {
       const grade = await new Grade ({
        subject: req.body.subject,
        grade: req.body.grade,
        user_id: req.body.user_id
      }).save()
   return res.json({ data: grade })
    }catch (error) {
      // We will be handling the error later
      console.log(error)
    }
})

 router.get("/", async (req, res) => {
   const grades = await Grade.find();
   res.json({ data: grades });
 });

  module.exports = router;