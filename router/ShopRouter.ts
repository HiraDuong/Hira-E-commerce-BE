import BaseRoutes from './base/BaseRouter';
import ShopController from '../controller/ShopController';
import {
    authenticateToken,
    authenticateTokenAdmin,
} from '../service/JwtService';

class ShopRoutes extends BaseRoutes {
    public routes(): void {
        // get all shops
        this.router.get('/all', ShopController.getAllShops);
        // get shop by id
        this.router.get('/id/:id', ShopController.getShopById);
        // get shops by user id
        this.router.get(
            '/user/:user_id',
            authenticateTokenAdmin,
            ShopController.getAllShopsByUserId,
        );
        // get shops by shop name
        this.router.get(
            '/name/:shop_name',
            ShopController.getAllShopsByShopName,
        );
        // create a new shop
        this.router.post(
            '/create',
            authenticateToken,
            ShopController.createShop,
        );
        // update shop by id
        this.router.put(
            '/update/:id',
            authenticateToken,
            ShopController.updateShop,
        );
        // delete shop by id
        this.router.delete(
            '/delete/:id',
            authenticateToken,
            ShopController.deleteShop,
        );
    }
}

export default new ShopRoutes().router;
