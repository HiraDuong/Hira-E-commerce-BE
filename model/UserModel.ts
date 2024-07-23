import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Shop from './ShopModel';

@Table({
    tableName: 'app_user',
    timestamps: false,
})
export class AppUser extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id',
    })
    user_id!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
        field: 'username',
    })
    username!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: 'user_email',
    })
    user_email!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'user_password',
    })
    user_password!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'user_telephone',
        unique: true,
    })
    user_telephone!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: 'user_avt',
    })
    user_avt!: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
        defaultValue: 'normal',
        field: 'user_role',
    })
    user_role!: string;

    @HasMany(() => Shop)
    shops!: Shop[];
}

export default AppUser;
