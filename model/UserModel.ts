import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Shop from './ShopModel';

@Table({
    tableName: 'app_user',
    timestamps:false,
})
export class AppUser extends Model{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id' as string,
    })
    user_id!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
        field: 'username' as string,
    })
    username!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: 'user_email' as string,
    })
    user_email!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'user_password' as string,
    })
    user_password!: string;
    
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'user_telephone' as string,
        unique: true,
    })
    user_telephone!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: 'user_avt' as string,
    })
    user_avt!: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
        defaultValue: 'normal',
        field: 'user_role' as string,
    })
    user_role!: string;

    @HasMany(() => Shop)
    shops!: Shop[];
}

export default AppUser;
