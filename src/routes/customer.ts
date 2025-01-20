import { Router } from 'express';
import { deleteCustomer, getCustomer, getCustomers, postCustomer, updateCustomer } from '../controllers/customer';

const router = Router();

router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.delete('/:id', deleteCustomer);
router.post('/', postCustomer);
router.put('/:id', updateCustomer);

export default router;