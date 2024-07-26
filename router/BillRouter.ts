import BillController from '../controller/BillController';
import {
    authenticateToken,
    authenticateTokenAdmin,
} from '../service/JwtService';
import BaseRoutes from './base/BaseRouter';

class BillRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post(
            '/create',
            authenticateToken,
            BillController.createBill,
        );
        this.router.put(
            '/update/:id',
            authenticateToken,
            BillController.updateBill,
        );
        this.router.delete(
            '/delete/:id',
            authenticateToken,
            BillController.deleteBill,
        );
        this.router.get(
            '/all',
            authenticateTokenAdmin,
            BillController.getAllBills,
        );
        this.router.get(
            '/user/:userId',
            authenticateToken,
            BillController.getBillByUserId,
        );
        this.router.get(
            '/id/:id',
            authenticateTokenAdmin,
            BillController.getBillById,
        );
    }
}

export default new BillRoutes().router;
