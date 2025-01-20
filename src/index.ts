import Server from './models/server';
import dotenv from 'dotenv';

// Configuramos las variables de ambiente
dotenv.config();

// Iniciar el servidor
const server = new Server();
server.listen();
