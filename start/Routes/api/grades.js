const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../../Models/User");
const authenticateUser = require("../../middleware/authenticate");
const Grade = require("../../Models/Grade");

const validator = require("../../Validation/gradeValid");

//Post a grade
router.post("/", authenticateUser, async (req, res) => {
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
    // We will be handling the error later
    console.log(error);
  }
});

// Delete a grade
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedGrade = await User.findByIdAndRemove(id);
    return res.json(deletedGrade + "was deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", authenticateUser, async (req, res) => {
  const grades = await Grade.find();
  res.json({ data: grades });
});

module.exports = router;
