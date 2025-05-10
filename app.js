const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const routes = require('./src/routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

routes(app);

app.post('/logout', function(req, res) {
  res.json({ auth: false, token: {} });
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error('ERR: ', err)
  // render the error page
  res.status(err.status || 500);
  res.json({ message: 'Informe ao administrador do sistema!' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.send({ error: "Desculpe, nada encontrado por aqui!" });
});

module.exports = app;