var express = require('express');
var router = express.Router();

const homeRouter = require('./home');
const registerRouter = require('./register');
const loginRouter = require('./login');
const linksRouter = require('./links');
const usersRouter = require('./users');
const infoRouter = require('./info');
const shortRouter = require('./short');

// const loginRouter = require('./login');

// const Link = require('../models/link');


function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}


module.exports = (app) => {
  app.use('/', homeRouter)
  app.use('/', registerRouter)
  app.use('/', loginRouter)
  app.use('/', linksRouter)
  app.use('/', usersRouter)
  app.use('/', shortRouter)
  app.use('/', verifyJWT, infoRouter)
  
  // app.use('/', loginRouter)
}

// module.exports = router;
