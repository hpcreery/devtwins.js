// const {User} = require('../mongomodels')
const User = require('../mongomodels/NewUser')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await new User(req.body)
      user.save((error) => {
        if (error) {
          console.log('error', error)
          res.status(400).send({
            error: 'This email account was unable to be used (Probably already used)'
          })
        } else {
          const userJSON = user.toJSON()
          res.send({
            user: userJSON,
            token: jwtSignUser(userJSON)
          })
        }
      })
      
    } catch (err) {
      res.status(400).send({
        error: 'An error occured'
      })
    }  
  },

  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email: email})
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      console.log(isPasswordValid, password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }
      
      const userJSON = user.toJSON()
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })

    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to login'
      })
    }  
  }
}