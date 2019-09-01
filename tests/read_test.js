const assert = require('assert');
const conf=require('./config/db'); 
var contato;
describe('Buscando detalhes de contato', () => {
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
    it('encontrar contato com o email fulano@fulano.com', (done) => {
        global.modelcontato.findOne({ email: 'fulano@fulano.com' })
            .then((contatobusca) => {
                assert(contatobusca.nome === 'Fulano'); 
                done();
            });
    })
})

