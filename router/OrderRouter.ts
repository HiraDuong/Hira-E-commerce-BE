import OrderController from '../controller/OrderController';
import {
    authenticateToken,
    authenticateTokenAdmin,
} from '../service/JwtService';
import BaseRoutes from './base/BaseRouter';

class OrderRouter extends BaseRoutes {
    routes(): void {
        this.router.post(
            '/create',
            authenticateToken,
            OrderController.createOrder,
        );
        this.router.put(
            '/update/:id',
            authenticateToken,
            OrderController.updateOrder,
        );
        this.router.delete(
            '/delete/:id',
            authenticateToken,
            OrderController.deleteOrder,
        );
        this.router.get(
            '/all',
            authenticateTokenAdmin,
            OrderController.getAllOrders,
        );
        this.router.get(
            '/user/:userId',
            authenticateToken,
            OrderController.getOrdersByUserId,
        );
        this.router.get(
            '/id/:id',
            authenticateTokenAdmin,
            OrderController.getOrderById,
        );
        this.router.get(
            '/merchandise/:merchandiseId',
            authenticateTokenAdmin,
            OrderController.getOrdersByMerchandiseId,
        );
        this.router.get(
            '/shop/:shopId',
            authenticateTokenAdmin,
            OrderController.getOrdersByShopId,
        );
    }
}
export default new OrderRouter().router;
