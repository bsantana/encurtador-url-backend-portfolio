var express = require('express');
var router = express.Router();

const Link = require('../models/link');
const User = require('../models/user');

router.get('/short/:code', async (req, res, next) => {
  try {
    const code = req.params.code;

    const link = await Link.findOne({
      where: { code },
      include: {
        model: User,
        attributes: ['id','email', 'payment', 'createdAt', 'updatedAt']
      }
    })
    if (!link) return res.sendStatus(404)

    link.hits++ // TODO: Criar outra rota e mandar os hits quando acessado pelo site // Ou talvez criar um controle por x tempos e ip
    await link.save()

    res.json(link.dataValues)
  } catch (err) {
    next(err)
  }
})

module.exports = router;