const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const path = require('path');
const consign = require('consign');
const methodOverride = require('method-override');
const flash = require('express-flash-notification');
const session = require('express-session');
const error = require('./middleware/error');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;



var store = new session.MemoryStore();
//configurar e conectar no banco de dados mongo
mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongodbURL, {
  useNewUrlParser: true
}).then(() => {
  console.log("Conectado com sucesso no banco de dados");
}).catch(err => {
  console.log('Não foi possível conectar ao banco de dados...', err);
  process.exit();
})
global.db = mongoose.connection

var app = express()
app.use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(methodOverride('_method'))
  .use(session({
    secret: "abc123",
    name: 'projetoes',
    resave: true,
    saveUninitialized: true,
    store: store
  }))
  .use(flash(app))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

consign().include('models')
  .then('controllers')
  .then('routes')
  .into(app)
app.use(error.notFound)
  .use(error.serverError);