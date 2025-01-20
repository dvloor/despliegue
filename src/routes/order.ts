import { Router } from 'express';
import {getOrders,} from '../controllers/order';

const router = Router();

router.get('/', getOrders);
// router.get('/:id', getOrder);
// router.delete('/:id', deleteOrder);
// router.put('/:id', updateOrder);

export default router;