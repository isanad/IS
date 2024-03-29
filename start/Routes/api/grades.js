const express = require("express");
const router = express.Router();
const User = require("../../Models/User");
const authenticateUser = require("../../middleware/authenticate");
const Grade = require("../../Models/Grade");
const jwt = require("jsonwebtoken");

const validator = require("../../Validation/gradeValid");

//Post a grade
router.post("/", authenticateUser, async (req, res) => {
  const what = await jwt.decode(req.headers.authorization.split(" ")[1]);
  if (what.userType === "instructor") {
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
        username: req.body.username
      });
      const user = await User.findOne({ username: grade.username });
      if (user.userType != "student") {
        return res.json({ msg: " this is not a student" });
      }
      const entry = await Grade.findOne({ username: grade.username });
      if (entry == null) {
        console.log("aho");
        grade.save();
        return res.json({ data: grade });
      }
      const entrys = await Grade.findOne({ subject: grade.subject });
      if (entrys == null) {
        console.log("aho");
        grade.save();
        return res.json({ data: grade });
      }
      if (entrys.subject === grade.subject) {
        console.log("HERE");
        return res.json({ msg: "duplicate entry" });
      } else {
        grade.save();
        return res.json({ data: grade });
      }
    } catch (error) {
      // We will be handling the error later
      console.log(error);
    }
  } else {
    return res.json({ msg: "You dont have access" });
  }
});

// Delete a grade
router.delete("/delete/:id", async (req, res) => {
  const what = await jwt.decode(req.headers.authorization.split(" ")[1]);
  if (what.userType === "instructor") {
    try {
      const id = req.params.id;
      const deletedGrade = await User.findByIdAndRemove(id);
      return res.json(deletedGrade + "was deleted successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.json({ msg: "You dont have access" });
  }
});

// Update grade
router.put("/update/:id", async (req, res) => {
  const what = await jwt.decode(req.headers.authorization.split(" ")[1]);
  if (what.userType === "instructor") {
    try {
      const isValidated = validator.updateValidation(req.body);
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      }

      Grade.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, model) => {
          if (!err) {
            return res.json({ data: model });
          } else {
            return res.json({
              err
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.json({ msg: "You dont have access" });
  }
});

router.get("/", authenticateUser, async (req, res) => {
  const what = await jwt.decode(req.headers.authorization.split(" ")[1]);
  if (what.userType === "instructor" || what.userType === "teacher assistant") {
    const grades = await Grade.find();
    res.json({ data: grades });
  }
  const grades = await Grade.findOne({ username: what.username });
  res.json({ data: grades });
});

module.exports = router;
