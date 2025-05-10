const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if(!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' })
    }

    const saltRounds = 10

    const hash = await bcrypt.hash(password.toString(), saltRounds)

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: hash
      }
    })

    if(!created) {
      return res.status(400).json({ message: 'Não foi possível finalizar o cadastro, email já está em uso' })
    }

    delete user.dataValues.password
    delete user.dataValues.payment

    res.json(user.dataValues)
  } catch (err) {
    next(err)
  }
})

module.exports = router;