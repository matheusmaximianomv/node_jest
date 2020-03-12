require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    storage: './__tests__/database.sqlite',
    schema: process.env.NODE_ENV === 'test' ? null : process.env.DB_SCHEMA,
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}