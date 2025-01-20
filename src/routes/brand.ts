import { Router } from 'express';
import { deleteBrand, getBrand, getBrands, postBrand, updateBrand } from '../controllers/brand';

const router = Router();

router.get('/', getBrands);
router.get('/:id', getBrand);
router.delete('/:id', deleteBrand);
router.post('/', postBrand);
router.put('/:id', updateBrand);

export default router;