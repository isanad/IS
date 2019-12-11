const express = require("express");
const router = express.Router();
const User = require("../../Models/User");
const validator = require("../../Validation/userValid");

//post a user
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      userType: req.body.userType
    }).save();
    return res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});

module.exports = router;
