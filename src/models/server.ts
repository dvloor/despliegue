import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import db from '../db/connection';
import routesProducto from '../routes/product';
import routesBrand from '../routes/brand';
import routesCategory from '../routes/category';
import routesSize from '../routes/size';
import routesCustomer from '../routes/customer';
import routesOrder from '../routes/order';
import routesOrderDetail from '../routes/order_detail';
import routesAdmin from '../routes/admin';
import authRoutes from '../routes/auth';

class Server {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.DB_PORT || '3000', 10);
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        }).on('error', (err: any) => {
            console.error('Error al iniciar el servidor:', err);
            process.exit(1); // Salir del proceso en caso de error
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            });
        });

        this.app.use('/api/products', routesProducto);
        this.app.use('/api/brands', routesBrand);
        this.app.use('/api/categories', routesCategory);
        this.app.use('/api/sizes', routesSize);
        this.app.use('/api/customers', routesCustomer);
        this.app.use('/api/orders', routesOrder);
        this.app.use('/api/order-details', routesOrderDetail);
        this.app.use('/api/admins', routesAdmin);
        this.app.use('/api/auth', authRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }
}

export default Server;
