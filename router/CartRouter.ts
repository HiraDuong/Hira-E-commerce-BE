import CartController from '../controller/CartController';
import {
    authenticateToken,
    authenticateTokenAdmin,
} from '../service/JwtService';
import BaseRoutes from './base/BaseRouter';

class CartRouter extends BaseRoutes {
    public routes(): void {
        this.router.get(
            '/all',
            authenticateTokenAdmin,
            CartController.getAllCarts,
        );
        this.router.get(
            '/user/:userId',
            authenticateToken,
            CartController.getCartByUserId,
        );
        this.router.get(
            '/id/:id',
            authenticateTokenAdmin,
            CartController.getCartById,
        );
        this.router.get(
            '/merchandise/:merchandiseId',
            authenticateTokenAdmin,
            CartController.getCartByMerchandiseId,
        );
        this.router.post(
            '/create',
            authenticateToken,
            CartController.createCart,
        );
        this.router.put(
            '/update/:id',
            authenticateToken,
            CartController.updateCart,
        );
        this.router.delete(
            '/delete/:id',
            authenticateToken,
            CartController.deleteCart,
        );
    }
}

export default new CartRouter().router;
