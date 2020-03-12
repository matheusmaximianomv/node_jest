require('dotenv').config({
    path: process.env.NODE_ENV = 'test' ? '.env.test' : '.env',
});

const express = require('express');

const routes = require('./routes');

require('./database/index');

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;