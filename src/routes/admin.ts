import { Router } from 'express';
import { deleteAdmin, getAdmin, getAdmins, postAdmin, updateAdmin } from '../controllers/admin';
import { login } from '../controllers/auth.controller';

const router = Router();
router.post('/', login);
router.get('/', getAdmins);
router.delete('/:id', deleteAdmin);
router.put('/:id', updateAdmin);

export default router;