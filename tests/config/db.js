const mongoose = require('mongoose');
const contatos = require('../../models/contatos');
const dotenv = require('dotenv');
dotenv.config();

//configurar e conectar no banco de dados mongo
mongoose.Promise = global.Promise;

mongoose.connect(process.env.mongodbURL, {
    useNewUrlParser: true
}).then(() => {
    //conectado com sucesso ao banco de dados
}).catch(err => {
    console.log('Não foi possível conectar ao banco de dados...', err);
    process.exit();
})
global.db = mongoose.connection
global.modelcontato= contatos();
//Called hooks which runs before something.
beforeEach((done) => {
    global.db.collections.contatos.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});
