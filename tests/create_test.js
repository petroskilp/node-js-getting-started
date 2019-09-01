const assert = require('assert');
require('./config/db'); 


describe('Teste para criar um registro', () => {
    it('Criar um contato', (done) => {
        //utilizando o model instanciado pelo app
        const contato = new global.modelcontato({
            nome: 'Fulano',
            sobrenome: 'de Tal',
            email: 'fulano@fulano.com',
            cidade: 'Ponta Grossa',
            pais: 'Brasil',
            profissao: 'Programador'
        });
        assert(contato.isNew);//Se o model contato ainda não foi salvo isNew==true
        contato.save() //envio para o banco de dados (retorna um promisse)
            .then(() => {
                assert(!contato.isNew); //Se o contato foi salvo no banco de dados ele não é novo
                done();
            });
    });
});