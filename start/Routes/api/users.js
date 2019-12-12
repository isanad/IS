const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys_dev").secretOrKey;
const User = require("../../Models/User");
const authenticateUser = require("../../middleware/authenticate");
const validator = require("../../Validation/userValid");
const bcrypt = require("bcryptjs");
const salt = 2;

// register user

//login user
router.post(
  "/login", //authenticateUser,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: "Please enter all details" });
      }
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ email: "Email does not exist" });
      const match = bcrypt.compare(password, user.password);
      if (match) {
        const payload = {
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
          userType: user.userType
        };
        const token = jwt.sign(payload, tokenKey, { expiresIn: "1h" });

        return res.json({ token });
      } else return res.status(400).send({ password: "Wrong password" });
    } catch (e) {}
  }
);

//register a user
router.post("/register", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      return res.json({ error: isValidated.error.details[0].message });
    }
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      userType: req.body.userType
    });

    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      user.save();
    });

    return res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
});

// Delete a user
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndRemove(id);
    return res.json(deletedUser + "was deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

// Update user
router.put("/update/:id", async (req, res) => {

  const what = await jwt.decode(req.headers.authorization.split(" ")[1]);
  const user = await User.findOne({ username: what.username });
  if(user.id != req.params.id){
    return res.json({msg: "You cannot update another user's info"})
  }

  try {
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }

    User.findByIdAndUpdate(
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
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});

module.exports = router;
