const { check, validationResult } = require('express-validator');
module.exports = function (app) {
    var Contato = app.models.contatos;
    var ContatoController = {
        index: function (req, res) {
            Contato.find(function (erro, contatos) {
                var resultado = { contatos: contatos };
                res.render('contatos/index', resultado);
            });
        },
        create: function (req, res) {
            res.render('contatos/create', { contato: {} });
        },
        store: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                var resultado = { errors: errors.array(), contato: req.body.contato };
                res.render('contatos/create', resultado);
                return;
            }
            var dados = req.body.contato;

            var contato = new app.models.contatos(dados);
            contato.save(function () {
                req.flash('success', 'Contato salvo!', '/contatos');
            });
        },
        show: function (req, res) {
            //
        },
        edit: function (req, res) {
            var _id = req.params.id;
            Contato.findById(_id, function (erro, contato) {
                var resultado = { contato: contato };
                res.render('contatos/edit', resultado);
            });
        },
        update: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.body.contato._id = req.params.id;
                var resultado = { errors: errors.array(), contato: req.body.contato };
                res.render('contatos/edit', resultado);
                return;
            }
            var _id = req.params.id;
            Contato.findById(_id, function (erro, contato) {
                contato.nome = req.body.contato.nome;
                contato.sobrenome = req.body.contato.sobrenome;
                contato.email = req.body.contato.email;
                contato.cidade = req.body.contato.cidade;
                contato.pais = req.body.contato.pais;
                contato.profissao = req.body.contato.profissao;
                contato.save(function () {
                    req.flash('success', 'Contato atualizado!', '/contatos');
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.params.id;
            Contato.deleteOne({ _id: _id }, function (erro) {
                req.flash('success', 'Contato apagado!', '/contatos');
            });
        },
        validate: [
            check('contato[email]', 'O email deve ser válido').isEmail(),
            check('contato[nome]', 'Campo nome é obrigatório').not().isEmpty(),
            check('contato[sobrenome]', 'Campo sobrenome é obrigatório').not().isEmpty()
        ]
        // fim do controller...
    }
    return ContatoController;
};