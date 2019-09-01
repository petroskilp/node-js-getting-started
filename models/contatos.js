module.exports = function(express) {
    var Schema = require('mongoose').Schema;
    var contato = Schema({
        nome: {type: String, required: true}, 
        sobrenome: {type: String, required: true}, 
        email: {type: String, required: true},
        cidade: {type: String, required: true}, 
        pais: {type: String, required: true}, 
        profissao: {type: String, required: true} 
    });
    return global.db.models.contatos||global.db.model('contatos', contato);
};