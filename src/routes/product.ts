import { Router } from 'express';
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct, getProductCount } from '../controllers/product';

const router = Router();

// Ruta para contar los productos
router.get('/count', getProductCount);
// Rutas existentes para productos
router.get('/', getProducts);  // Obtener todos los productos
router.get('/:id', getProduct); // Obtener producto por id
router.post('/', postProduct);  // Crear nuevo producto
router.put('/:id', updateProduct);  // Actualizar producto por id
router.delete('/:id', deleteProduct);  // Eliminar producto por id



export default router;