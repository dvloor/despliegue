import { Router } from 'express';
import { deleteOrderDetail, getOrderDetail, getOrderDetails, postOrderDetail, updateOrderDetail } from '../controllers/order-detail';

const router = Router();

router.get('/', getOrderDetails);
router.get('/:id', getOrderDetail);
router.delete('/:id', deleteOrderDetail);
router.post('/', postOrderDetail);
router.put('/:id', updateOrderDetail);

export default router;