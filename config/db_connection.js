const { Sequelize } = require('sequelize'); // pull in the constructor
require('dotenv').config()
// Set up our connection to the mysql server locally or on the cloud(production)
// let sequelize;
// if (process.env.JAWSBD_URL){
//   sequelize = new Sequelize(process.env.JAWSBD_URL)
// }else{
//   sequelize = new Sequelize ( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
//     { // options object
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );
// }
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