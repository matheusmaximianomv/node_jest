const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING
        }, {
            sequelize: connection
        });

        this.addHook('beforeSave', async user => {
            if(user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }

    generateToken() {
        return jwt.sign({ id: this.id }, process.env.APP_SECRET, { expiresIn: '1d' })
    }
}

module.exports = User;