import BaseRoutes from './base/BaseRouter';
import AuthController from '../controller/AuthController';
class AuthRoutes extends BaseRoutes {
    routes(): void {
        this.router.post('/login', AuthController.login);
        this.router.post('/register', AuthController.register);
    }
}

export default new AuthRoutes().router;
