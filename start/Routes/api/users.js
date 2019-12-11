const express = require('express')
const router = express.Router()
//const joi = require('joi')
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys").secretOrKey;
//const sendNotif = require("../../utils/mailer");
const User = require('../../Models/User')
const authenticateUser = require("../../middleware/authenticate");
//const validator = require('../../Validation/eventValid')

// register user
router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const {
      email,
      age,
      name,
      //password,
      username,
      phoneNumber,
      userType,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });
    const user1 = await User.findOne({ username });
    if (user1)
      return res.status(400).json({ error: "username already exists" });

    //const salt = bcrypt.genSaltSync(10);
    //const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      userType: req.body.userType,
    }).save();
    //sendNotif(req.body.email, "Welcome to lirten hub", "Registration");
    return res.json({ data: newUser });
  } catch (error) {
    console.log(error);
  }
});
//login user
router.post("/login",authenticateUser, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ email: "Email does not exist" });
    //const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });

      return res.json({ token });
    } else return res.status(400).send({ password: "Wrong password" });
  } catch (e) {}
});
  //post a user
 /*router.post("/", async (req, res) => {
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
})*/

 router.get("/", async (req, res) => {
   const users = await User.find();
   res.json({ data: users });
 });

  module.exports = router;