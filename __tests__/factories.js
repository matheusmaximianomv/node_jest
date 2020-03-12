const { factory } = require('factory-girl');
const faker = require('faker');

const User = require('../src/app/models/User');

factory.define('User', User, {
    name: 'Matheus Maximiano',
    email: 'matheus@email.com',
    password: '1234567891011'
});

factory.define('User_with_faker', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
});

module.exports = factory;
