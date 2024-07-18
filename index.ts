import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Database from './config/postgreDB';
import router from './router/Router';
// Đọc các biến môi trường từ file .env
dotenv.config();

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.plugin();
    this.routes();
    this.databaseAsync();
  }

  // Cấu hình cơ bản của ứng dụng
  protected plugin(): void {
    this.app.use(express.json()); // Cho phép Express đọc dữ liệu JSON từ các yêu cầu
    this.app.use(express.urlencoded({ extended: true })); // Cho phép Express xử lý dữ liệu từ phương thức POST
    this.app.use(cors()); // Sử dụng CORS cho tất cả các tuyến đường
  }

  protected routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to Express & TypeScript Server');
    });

    this.app.use("/api/v1", [
      router
    ]);
  }

  protected async databaseAsync(): Promise<void> {
    const db = new Database();
    await db.sequelize?.sync(); // Sử dụng await để đảm bảo đồng bộ hóa cơ sở dữ liệu
  }
}

const app = new App().app;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
