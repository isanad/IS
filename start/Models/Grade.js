const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GradeSchema = new Schema({
  subject: { type: String, required: true},
  grade: { type: String, required: true},
  user_id: {type: Number, required: true}
})

GradeSchema.index({ subject: 1, user_id: 1 }, { unique: true });

module.exports = Grade = mongoose.model('grades', GradeSchema)
