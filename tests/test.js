// Importação de dependências para os testes
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.use(chaiHttp);
chai.should();
describe("Teste de request para contatos", () => {
    describe("Rotas para /contatos", () => {
        // Testar a requisição para listagem de todos contatos
        it("deve listar todos contatos", (done) => {
            chai.request(app)
                .get('/contatos')
                .end((err, res) => {
                    //o status para uma requisição com resposta correta é 200
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Testar a requisição da tela de edição de contato
        it("deve mostrar a tela de edição de contatos", (done) => {
            // Criar um novo contato par realizar a edição do mesmo
           
            chai.request(app)
                .get(`/contatos/${contato._id}/editar`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Testar a edição de um contao que não existe
        it("não deve retornar a tela de edição de contato", (done) => {
            const id = '11111111111111';
            chai.request(app)
                .get(`/contatos/${id}/editar`)
                .end((err, res) => {
                    //caso o contato não exista deve ser retornado o erro 404
                    res.should.have.status(404);
                    done();
                });
        });
    });
});