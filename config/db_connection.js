const { Sequelize } = require('sequelize'); // pull in the constructor

// Set up our connection to the mysql server locally or on the cloud(production)

const connection = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
  { // options object
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = connection; // export the connection object