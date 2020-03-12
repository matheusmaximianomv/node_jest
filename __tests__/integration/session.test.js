const request = require('supertest');
const truncate = require('../utils/truncate');

require('../../src/database/index');

const app = require('../../src/app');
const User = require('../../src/app/models/User');

const factory = require('../factories');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('Should authenticate with valid credentials', async () => {
        await User.create({
            name: 'Matheus Maximiano',
            email: 'matheus@email.com',
            password: '123456789'
        });

        const response = await request(app).post('/sessions').send({
            email: "matheus@email.com",
            password: '123456789'
        });

        expect(response.status).toBe(200);

    });

    it('should not authenticate with credentials invalid', async () => {
        await User.create({
            name: 'Matheus Maximiano',
            email: 'matheus@email.com',
            password: '123456789'
        });

        const response = await request(app).post('/sessions').send({
            email: "matheus@email.com",
            password: '123456'
        });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticate', async() => {
        await User.create({
            name: 'Matheus Maximiano',
            email: 'matheus@email.com',
            password: '123456789'
        });

        const response = await request(app).post('/sessions').send({
            email: "matheus@email.com",
            password: '123456789'
        });

        expect(response.body).toHaveProperty('token');
    });

    it('should be able to access private routes when authenticated', async() => {
        const user = await User.create({
            name: 'Matheus Maximiano',
            email: 'matheus@email.com',
            password: '123456789'
        });

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not be able to access privates routes when without jwt token', async() => {
        await User.create({
            name: 'Matheus Maximiano',
            email: 'matheus@email.com',
            password: '123456789'
        });

        const response = await request(app).get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('should not be able to access privates routes when with invalid jwt token', async() => {
        await User.create({
            name: 'Matheus Maximiano',
            email: 'matheus@email.com',
            password: '123456789'
        });

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer 123456789987654321`);

        expect(response.status).toBe(401);
    });
});

describe('Authentication test with factory-girl', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('Should authenticate with valid credentials', async () => {
        await factory.create('User', {
            password: '123456789'
        })

        const response = await request(app).post('/sessions').send({
            email: "matheus@email.com",
            password: '123456789'
        });

        expect(response.status).toBe(200);

    });

    it('should not authenticate with credentials invalid', async () => {
        await factory.create('User', {
            password: '123456789'
        });

        const response = await request(app).post('/sessions').send({
            email: "matheus@email.com",
            password: '1234567891011'
        });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticate', async() => {
        await factory.create('User', {
            password: '123456789'
        });

        const response = await request(app).post('/sessions').send({
            email: "matheus@email.com",
            password: '123456789'
        });

        expect(response.body).toHaveProperty('token');
    });

    it('should be able to access private routes when authenticated', async() => {
        const user = await factory.create('User');

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not be able to access privates routes when with invalid jwt token', async() => {
        await factory.create('User');

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer 123456789987654321`);

        expect(response.status).toBe(401);
    });
});

describe('Authentication test with factory-girl and faker', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('Should authenticate with valid credentials', async () => {
        const user = await factory.create('User_with_faker', {
            password: '123456789'
        })

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123456789'
        });

        expect(response.status).toBe(200);

    });

    it('should not authenticate with credentials invalid', async () => {
        await factory.create('User_with_faker');

        const response = await request(app).post('/sessions').send({
            email: "matheus@email.com",
            password: '1234567891011'
        });

        expect(response.status).toBe(401);
    });

    it('should return jwt token when authenticate', async() => {
        const user = await factory.create('User_with_faker', {
            password: '123456789'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123456789'
        });

        expect(response.body).toHaveProperty('token');
    });

    it('should be able to access private routes when authenticated', async() => {
        const user = await factory.create('User_with_faker');

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not be able to access privates routes when without jwt token', async() => {
        await factory.create('User_with_faker');

        const response = await request(app).get('/dashboard').set('Authorization', `Bearer 123456789987654321`);

        expect(response.status).toBe(401);
    });
});
