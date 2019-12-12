const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GradeSchema = new Schema({
  subject: { type: String,enum:["math" , "english", "chemistry"], required: true},
  grade: { type: Number, required: true},
  username: {type: String, required: true, unique: true}
})

GradeSchema.index({ subject: 1, username: 1 }, { unique: true });

module.exports = Grade = mongoose.model('grades', GradeSchema)
