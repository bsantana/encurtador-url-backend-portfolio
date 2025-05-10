const express = require('express')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const md5 = require('md5')
const sha1 = require('sha1')

const User = require('../models/user')
const sendMail = require('../services/sendMail')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password,  } = req.body

    if(!email || !password || !username) {
      return res.status(400).json({ message: 'email, username e password são obrigatórios' })
    }

    const saltRounds = 10

    const hashPassword = await bcrypt.hash(password.toString(), saltRounds)

    const hashToken = sha1(md5(uuidv4()))

    const [user, created] = await User.findOrCreate({
      where: { email: email.toLowerCase() },
      defaults: {
        name: username,
        password: hashPassword,
        hashToken
      }
    })

    if(!created) {
      return res.status(400).json({ message: 'Não foi possível finalizar o cadastro, email já está em uso' })
    }

    delete user.dataValues.password
    delete user.dataValues.payment
    delete user.dataValues.verified
    delete user.dataValues.hashToken

    await sendMail({
      to: email,
      template: 'register',
      url: `${process.env.DOMAIN}/register/verify/${hashToken}`,
      name: username
    })

    res.json(user.dataValues)
  } catch (err) {
    next(err)
  }
})

router.get('/register/emails/verify/:hashToken', async (req, res, next) => {
  try {
    const hashToken = req.params.hashToken

    if(!hashToken) return res.sendStatus(400)

    const user = await User.findOne({
      where: { hashToken, verified: 0 }
    })

    if(!user) {
      return res.sendStatus(404)
      // return res.status(404).json({ message: 'E-mail e/ou senha incorreto(s)' })
    }

    user.hashToken = null
    user.verified = 1

    await user.save()

    // await sendMail()
    res.json({ message: 'Email verificado com sucesso!'})
  } catch (err) {
    next(err)
  }
})

module.exports = router;