var express = require('express');
var router = express.Router();

const Link = require('../models/link');
const User = require('../models/user');

// router.post('/new', async (req, res, next) => {
//   const url = req.body.url;
//   const code = generateCode();

//   res.send(`${process.env.DOMAIN}${code}`);
// })

function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.get('/links', async (req, res, next) => {
  try {
    // const url = req.body.url;
    // const code = generateCode();
    const links = await Link.findAll({ include: { model: User, as: 'user', attributes: ['id','email', 'payment', 'createdAt', 'updatedAt'] } })

    // const resultado = await Link.create({ // TODO: Verificar se o código já não existe antes
    //   url,
    //   code
    // })
    // console.log('resultado.dataValues', resultado.dataValues)
    // console.log('resultado', resultado)

    // delete resultado.dataValues.id

    // res.render('stats', resultado.dataValues);
    res.json(links);
  } catch (err) {
    console.log("ERR: ", err)
    next(err);
  }
})

router.post('/links', async (req, res, next) => {
  try {
    const { url } = req.body
    const domain = process.env.DOMAIN

    if(!url) {
      return res.status(400).json({ message: 'Url é obrigatório' })
    }
    
    const code = generateCode(); // TODO: Se req.body.code então herda dele e verifica no banco se já existe para retornar ao usuário que existe com status 400

    let [link, created] = await Link.findOrCreate({ // TODO: Passar em userId req.userId caso logado
      where: { code },
      defaults: {
        url,
        domain,
        userId: req.userId
      }
    })

    while(!created) {
      [link, created] = await Link.findOrCreate({
        where: { code },
        defaults: {
          url,
          domain,
          userId: req.userId
        }
      })
    }

    res.json(link.dataValues);
  } catch (err) {
    console.log("ERR: ", err)
    next(err);
  }
})

router.get('/links/:code/stats', async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code } });
  if (!resultado) return res.sendStatus(404);
  res.render('stats', resultado.dataValues);
})

router.get('/links/:code', async (req, res, next) => {
  try {
    const code = req.params.code;

    const link = await Link.findOne({
      where: { code },
      include: {
        model: User,
        attributes: ['id','email', 'createdAt', 'updatedAt']
      }
    })
    if (!link) return res.sendStatus(404)

    link.hits++ // TODO: Criar outra rota e mandar os hits quando acessado pelo site // Ou talvez criar um controle por x tempos e ip
    await link.save()

    // res.render('redirect', link.dataValues)
    res.json(link.dataValues)
  } catch (err) {
    next(err)
  }
})

module.exports = router;