import db from './connection'; // Conexión a la base de datos

// Sincronizar base de datos (opcional, en modo desarrollo)
db.sync({ force: false })
  .then(() => console.log('Database synchronized'))
  .catch((error) => console.error('Error synchronizing database', error));

export default db;
