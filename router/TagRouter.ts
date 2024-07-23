import TagController from '../controller/TagController';
import {
    authenticateToken,
    authenticateTokenAdmin,
} from '../service/JwtService';
import BaseRoutes from './base/BaseRouter';

class TagRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/all', authenticateToken, TagController.getAllTags);
        this.router.get(
            '/name/:name',
            authenticateToken,
            TagController.getTagByName,
        );
        this.router.post(
            '/create',
            authenticateTokenAdmin,
            TagController.createTag,
        );
        this.router.delete(
            '/delete/:id',
            authenticateTokenAdmin,
            TagController.deleteTag,
        );
    }
}
export default new TagRoutes().router;
