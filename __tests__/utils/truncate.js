const User = require('../../src/app/models/User');

const models = [ User ];

module.exports = () => {
    return Promise.all(models.map(model => {
        return model.destroy({ truncate: true, force: true })
    }));
} 