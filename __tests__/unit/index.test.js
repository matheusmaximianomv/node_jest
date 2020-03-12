const request = require('supertest');

const app = require('../../src/app');

describe('Teste de Index', () => {
    it('Home', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
    })
});