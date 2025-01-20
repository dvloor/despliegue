import { Router } from 'express';
import { deleteSize, getSizes, getSize, postSize, updateSize } from '../controllers/size';

const router = Router();

router.get('/', getSizes);
router.get('/:id', getSize);
router.delete('/:id', deleteSize);
router.post('/', postSize);
router.put('/:id', updateSize);

export default router;