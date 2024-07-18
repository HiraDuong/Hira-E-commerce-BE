import BaseRoutes from "./base/BaseRouter";
import UserController from "../controller/UserController";
import { authenticateToken,authenticateTokenAdmin } from "../service/JwtService";
class UserRoutes extends BaseRoutes {
    routes(): void {
        this.router.get('/all',authenticateTokenAdmin, UserController.getAllUsers);
        this.router.get('/id/:id',authenticateTokenAdmin, UserController.getUserById);
        // this.router.post('/create', UserController.createUser);
        this.router.put('/update/:id',authenticateToken, UserController.updateUser);
        this.router.delete('/delete/:id',authenticateToken, UserController.deleteUser);
    }
}

export default new UserRoutes().router;