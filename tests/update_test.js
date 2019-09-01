const assert = require('assert');
require('./config/db');
var contato;

function verificaAtualizado(statement, done) {
    statement
     .then(() => global.modelcontato.find({}))
     .then((contatobusca) => {
      assert(contatobusca.length === 1);
      assert(contatobusca[0].nome === 'Sicrano');
      done();
    });
  }

describe('Atualizando um contato', () => {
    beforeEach((done) => {
        contato = new global.modelcontato({
            nome: 'Fulano',
            sobrenome: 'de Tal',
            email: 'fulano@fulano.com',
            cidade: 'Ponta Grossa',
            pais: 'Brasil',
            profissao: 'Programador'
        });
        contato.save()
            .then(() => done());
    });
    it('Modificar e salvar o nome de um contato', (done) => {
        contato.set('nome', 'Sicrano');
        verificaAtualizado(contato.save(), done);
    });

    it('Atualizar utilizando a instancia', (done) => {
        verificaAtualizado(contato.updateOne({nome: "Sicrano"}), done);
    });

    it('Atualizar utilizando o model', (done) => {
        verificaAtualizado(global.modelcontato.updateOne({nome: "Fulano"}, {nome: "Sicrano"}), done);
    });
    it('Atualizar utilizando o id', (done) => {
        verificaAtualizado(global.modelcontato.updateOne({_id: contato._id}, {nome: "Sicrano"}), done);
    });
   
})

