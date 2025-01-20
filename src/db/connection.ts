import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('almacen', 'root', 'Tm%$9vFwYp@3', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;