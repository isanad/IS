const express = require('express')
const router = express.Router()
const app = express()


app.get("/",  (req, res) => {
    res.send(`<h1>Welcome</h1>`);
  });

  module.exports = router;