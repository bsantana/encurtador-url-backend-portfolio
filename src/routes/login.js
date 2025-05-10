const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const router = express.Router()

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if(!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' })
    }

    const user = await User.findOne({
      where: { email }
    })

    let match = false
    if(user) {
      match = await bcrypt.compare(password.toString(), user.password)
    }

    if(!user || !match) {
      return res.status(400).json({ message: 'E-mail e/ou senha incorreto(s)' })
    }

    // TODO: Vefificar se usuário está verificado na tabela de usuários

    //auth ok
    const id = user.dataValues.id
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    })

    delete user.dataValues.password

    res.json({
      auth: true,
      token: { accessToken: token, refreshToken: null },
      user
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router;