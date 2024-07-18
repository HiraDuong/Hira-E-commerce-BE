import { Router } from 'express';
import UserRouter from './UserRouter';
import TestRouter from './TestRouter';
import ShopRouter from './ShopRouter';
import AuthRouter from './AuthRouter';
import MerchandiseRouter from './MerchandiseRouter';

const router = Router();

router.use('/users', UserRouter);
router.use('/tests', TestRouter);
router.use('/shops', ShopRouter);
router.use('/auth', AuthRouter);
router.use('/merchandises', MerchandiseRouter);
export default router;
