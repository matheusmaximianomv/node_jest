const bcrypt = require('bcryptjs');

require('../../src/database/index');

const User = require('../../src/app/models/User');

const truncate = require('../utils/truncate');

describe('Unit test user', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'Matheus Maximiano',
            email: 'matheusmaximiano@email.com',
            password: '123456789'
        });

        const compareHash = await bcrypt.compare('123456789', user.password_hash);

        expect(compareHash).toBe(true);
    });
});