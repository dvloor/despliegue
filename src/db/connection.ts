import { Sequelize } from 'sequelize';
import { config } from '../config.js'; // Importa la configuración

const { host, user, password, name, port } = config.db;

const sequelize = new Sequelize(name, user, password, {
  host: host,
  port: port,
  dialect: 'mysql',
  logging: false, // Desactiva logs para entornos de producción
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida exitosamente.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

export default sequelize;
