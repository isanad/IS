const express = require('express')
const router = express.Router()
const app = express()
//const joi = require('joi')
const Grade = require('../../Models/Grade')
//const validator = require('../../Validation/eventValid')

  //post a grade
  router.post("/", async (req, res) => {
   /* try {
      const isValidated = validator.createValidation(req.body)
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      }*/

      const grade = await new Grade ({
        subject: req.body.subject,
        grade: req.body.grade
      }).save()

    return res.json({ data: grade })
})
app.get("/",  (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

  module.exports = router;