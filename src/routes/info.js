var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.get('/info', async function(req, res, next) {
  // const users = await User.findAll({attributes: ['id','email', 'createdAt', 'updatedAt']});
  // const users = await User.findAll();
  res.json({message: 'info verificada'});
});

module.exports = router;