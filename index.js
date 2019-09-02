const express = require('express'); //Framework web
const bodyParser = require('body-parser'); //Middleware para realizar o parse dos dados de formulários (request body)
const mongoose = require('mongoose');//Persistência e modelagem do banco de dados MongoDB
const path = require('path');//Utilitário para utilizar os caminhos de diretórios do projeto
const consign = require('consign');//Autoload de scripts, como por exemplo models, controllers e routes
const methodOverride = require('method-override');//Para utilizar os verbos HTTP como PUT e DELETE
const flash = require('express-flash-notification');//Para gerenciar notificações de uma página para outra
const session = require('express-session');//Para armazenar informações na sessão do cliente
const error = require('./middleware/error');//Middleware para mostrar páginas "amigáveis" quando ocorre um erro ou not found
const dotenv = require('dotenv');//Utilizar as configurações de ambiente environment
dotenv.config();//Carregar as configurações de ambiente (arquivo .env)

const PORT = process.env.PORT || 5000;//A porta é definida de acordo com a variável ambiente PORT ou por padrão a porta 5000

//configurar e conectar no banco de dados mongo
mongoose.Promise = global.Promise;
//conecta com o banco de dados configurado na variável ambiente mongodbURL
mongoose.connect(process.env.mongodbURL, {
  useNewUrlParser: true
}).then(() => {
  console.log("Conectado com sucesso no banco de dados");
}).catch(err => {
  console.log('Não foi possível conectar ao banco de dados...', err);
  process.exit();
});
//Armazenar a conexão realizada em uma variável global
global.db = mongoose.connection;

//Iniciar um armazenamento de sessão
var store = new session.MemoryStore();

//Iniciar o express
var app = express();
//Configurar todos os utilitários e middlewares dentro do express (variável app)
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
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//Realizar o autoload de todos os arquivos js que estão dentro das pastas
// - /models
// - /controllers
// - /routes
consign().include('models')
  .then('controllers')
  .then('routes')
  .into(app);

//Configurar o express para redirecionar para a rota que irá renderizar a página "amigável" em caso de erro ou not found
app.use(error.notFound)
  .use(error.serverError);

//Finalmente exportar o express (app)
module.exports = app;