import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { URL } from 'url';

dotenv.config();

// Check if DB_URL is defined in the .env file
if (!process.env.DB_URL) {
  console.error('Error: DB_URL is not defined in the .env file.');
  process.exit(1);
}

let dbUrl;
try {
  // Parse the DB_URL from the .env file
  dbUrl = new URL(process.env.DB_URL);
} catch (error) {
  console.error('Invalid DB_URL format:', error);
  process.exit(1);
}

console.log('Database URL:', process.env.DB_URL);

// Create Sequelize instance using parsed values
const sequelize = new Sequelize(
  dbUrl.pathname.slice(1),         
  dbUrl.username,                  
  dbUrl.password,                  
  {
    host: dbUrl.hostname,          
    dialect: 'mysql',              
    port: dbUrl.port || 3306,      
    logging: false,                
  }
);

// Authenticate the connection to MySQL database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

export default sequelize;
