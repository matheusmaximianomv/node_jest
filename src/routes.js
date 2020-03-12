const { Router } = require('express');

const routes = new Router();

const SessionController = require('./app/controllers/SessionController');

const authMiddleware = require('./app/middlewares/auth');

routes.get('/', (req, res) => {
    return res.status(200).json({
        name: 'Aula sobre tdd',
        description: 'Desenvolvimento de uma aplicação baseada em tdd com a ferramenta de testes jest'
    });
});

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', async (req, res) => {
    return res.status(200).json();
});

module.exports = routes;