const assert = require('assert');
const conf = require('./config/db');
var contato;

describe('Apagando um contato', () => {
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
    it('removendo o contato com a mesma instância', (done) => {
        contato.remove()
            .then(() => global.modelcontato.findOne({ email: 'fulano@fulano.com' }))
            .then((contatobusca) => {
                assert(contatobusca === null);
                done();
            });
    });
    it('Removendo todos contatos com nome Fulano', (done) => {
        global.modelcontato.deleteMany({ nome: 'Fulano' })
            .then(() => global.modelcontato.findOne({ nome: 'Fulano' }))
            .then((contatobusca) => {
                assert(contatobusca === null);
                done();
            });
    });
    it('Removendo apenas um contato com nome de fulano', (done) => {
        global.modelcontato.countDocuments({ nome: 'Fulano' })
            .then((qtd) => global.modelcontato.deleteOne({ nome: 'Fulano' })
                .then(() => global.modelcontato.countDocuments({ nome: 'Fulano' })
                    .then((qtd2) => {
                        assert(qtd2 === qtd - 1);
                        done();
                    })
                )
            );
    });
    it('Removendo um contato pelo _id', (done) => {
        global.modelcontato.deleteOne({ _id: contato._id })
            .then(() => global.modelcontato.findOne({ email: 'fulano@fulano.com' }))
            .then((contatobusca) => {
                assert(contatobusca === null);
                done();
            });
    });
})

