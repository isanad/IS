const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GradeSchema = new Schema({
  subject: { type: String, required: true},
  grade: { type: String, required: true},
  
})

module.exports = Grade = mongoose.model('grades', GradeSchema)
