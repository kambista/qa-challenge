const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const passwordService = require('./password')
const emailService = require('./email')

const users = [
  {
    email: 'correo@kambista.com',
    password: 'password'
  }
]

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const middleware = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(422).json({
      code: 999,
      msg: 'REQUIRED'
    })
    return
  }
  next()
}

app.post('/users', middleware, (req, res) => {
  const { email, password } = req.body
  if (passwordService.length(password) > 6 && emailService.validate(email)) {
    users.push({
      email, password
    })
    res.json({
      code: 201,
      msg: 'SAVED'
    })
    return
  }
  res.status(422).json({
    code: 998,
    msg: 'INVALID'
  })
})

app.post('/users/login', middleware, (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user || user.password !== password) {
    res.json({
      code: 997,
      msg: 'INVALID'
    })
    return
  }
  res.json({
    code: 201,
    msg: 'LOGIN'
  })
})

app.listen(port, () => {
  console.log('Server listen port: ', port)
})
