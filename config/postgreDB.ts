import { Sequelize } from "sequelize-typescript";
import AppUser from "../model/UserModel";
import * as dotenv from "dotenv";
import Shop from "../model/ShopModel";
import Merchandise from "../model/MerchandiseModel";
dotenv.config();


class Database {
    public sequelize: Sequelize | undefined;


    private POSTGRES_DB = process.env.PG_DATABASE as string;
    private POSTGRES_HOST = process.env.PG_HOST as string;
    private POSTGRES_PORT = process.env.PG_PORT as unknown as number;
    private POSTGRES_USER = process.env.PG_USER as unknown as string;
    private POSTGRES_PASSWORD = process.env.PG_PASSWORD as unknown as string;

    constructor() {
        this.connectToPostgreSQL();
    }


    private async connectToPostgreSQL() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            models:[AppUser,Shop,Merchandise]
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                console.log(
                    "✅ PostgreSQL Connection has been established successfully."
                );
            })
            .catch((err) => {
                console.error("❌ Unable to connect to the PostgreSQL database:", err);
            });
    }
}

export default Database;