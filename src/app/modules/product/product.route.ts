import express from 'express';
import { ProductZodValidation } from './product.validation';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
const router = express.Router();

router.get('/', ProductController.getAllProduct);
router.get('/random', ProductController.getRandom);
router.get('/:id', ProductController.getSingleProduct);

router.post(
  '/',
  validateRequest(ProductZodValidation.productZodSchema),
  ProductController.createProduct
);

router.patch(
  '/:id',
  validateRequest(ProductZodValidation.productUpdateZodSchema),
  ProductController.updateProduct
);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;
