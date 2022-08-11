const { Sequelize } = require('sequelize'); // pull in the constructor
require('dotenv').config()

const connection = 
process.env.JAWSDB_URL ? 
    new Sequelize(
        process.env.JAWSDB_URL
    ) :
    new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
            logging: false

        }
    );



module.exports = connection; // export the connection object