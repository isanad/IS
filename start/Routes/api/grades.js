const express = require("express");
const router = express.Router();
const Grade = require("../../Models/Grade");
const validator = require("../../Validation/gradeValid");

//post a grade
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }

    const grade = await new Grade({
      subject: req.body.subject,
      grade: req.body.grade,
      user_id: req.body.user_id
    }).save();
    return res.json({ data: grade });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const grades = await Grade.find();
  res.json({ data: grades });
});

module.exports = router;
