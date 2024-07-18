import MerchandiseController from "../controller/MerchandiseController";
import { authenticateToken } from "../service/JwtService";
import BaseRoutes from "./base/BaseRouter";

class MerchandiseRoutes extends BaseRoutes{
    routes(): void {
    //   create merchandise
    this.router.post('/create',authenticateToken, MerchandiseController.createMerchandise);
    // delete merchandise by id
    this.router.delete('/delete/:id', authenticateToken, MerchandiseController.deleteMerchandiseById);
    // update merchandise by id
    this.router.put('/update/:id', authenticateToken, MerchandiseController.updateMerchandiseById);
    // get all merchandises
    this.router.get('/all', MerchandiseController.getAllMerchandises);
    // get merchandise by shop id
    this.router.get('/shop/:shop_id', MerchandiseController.getMerchandiseByShopId);
    // get merchandise by id    
    this.router.get('/id/:id', MerchandiseController.getMerchandiseById);
    // get merchandise by name
    this.router.get('/name/:name', MerchandiseController.getMerchandiseByName);

    }
}

export default new MerchandiseRoutes().router;