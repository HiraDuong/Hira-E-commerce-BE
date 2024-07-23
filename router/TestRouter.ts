import BaseRoutes from './base/BaseRouter';
class TestRoutes extends BaseRoutes {
    routes(): void {
        this.router.get('/hello', (req, res) => {
            res.send('Hello World');
        });
    }
}

export default new TestRoutes().router;
