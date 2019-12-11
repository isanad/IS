const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = require('./start/config/keys').mongoURI
const Logger = require('./start/middleware/Logger')
//const passport = require('passport')
//const cors = require('cors')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


// Connect to mongo
mongoose
  .connect(
    'mongodb+srv://isanad:isanad300@cluster0-bvkba.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//app.use(cors())

app.use((request, response, next) => {
  Logger.log(`${request.method} => ${request.originalUrl}`)
  next()
})
const grades = require('./start/Routes/api/grades')

 app.get("/", (req, res) => {
  res.send(`<h1>Welcome Team404</h1>
   <a href ="/start/Routes/api/grades">Grades</a> `);
});

app.use('', grades)


app.use((req, res) => {
  res.status(404).send({ err: 'We can not find what you are looking for' })
})

// opens the port at 3000
app.listen(process.env.PORT || 3001, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  )
})
