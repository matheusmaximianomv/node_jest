const server = require('./app');

server.listen('3333', () => {
    console.log('Server Running in http://localhost:3333');
})