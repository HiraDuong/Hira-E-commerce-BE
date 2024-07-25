import { Router } from 'express';
import UserRouter from './UserRouter';
import TestRouter from './TestRouter';
import ShopRouter from './ShopRouter';
import AuthRouter from './AuthRouter';
import MerchandiseRouter from './MerchandiseRouter';
import TagRouter from './TagRouter';
import CartRouter from './CartRouter';
import OrderRouter from './OrderRouter';
import BillRouter from './BillRouter';

const router = Router();

router.use('/users', UserRouter);
router.use('/tests', TestRouter);
router.use('/shops', ShopRouter);
router.use('/auth', AuthRouter);
router.use('/merchandises', MerchandiseRouter);
router.use('/tags', TagRouter);
router.use('/carts', CartRouter);
router.use('/orders', OrderRouter);
router.use('/bills', BillRouter);
export default router;
