module.exports = function (app) {
    var contatos = app.controllers.contatos;
    app.get('/contatos', contatos.index);
    app.get('/contatos/create', contatos.create);
    app.post('/contatos/create', contatos.validate, contatos.store);
    app.get('/contatos/:id/editar', contatos.edit);
    app.put('/contatos/:id', contatos.validate, contatos.update);
    app.delete('/contatos/:id', contatos.destroy);
};