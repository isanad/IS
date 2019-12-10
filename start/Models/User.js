const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  age: {type: Number,required: true},
  username: {type: String,required: true, unique: true},
  phoneNumber: {type: Number,required: true, unique: true},
  userType: {type: String,enum:["Student" , "Instructor", "Teacher Assistant"], required: true}
});


module.exports = User = mongoose.model("users", UserSchema);
