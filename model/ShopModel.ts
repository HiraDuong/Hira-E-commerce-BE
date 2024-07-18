import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { AppUser } from './UserModel';
import Merchandise from './MerchandiseModel';

@Table({
    tableName: 'shop',
    timestamps: false,
})
export class Shop extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'shop_id',
    })
    shop_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'shop_name',
    })
    shop_name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'shop_description',
    })
    shop_description!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'shop_avt',
    })
    shop_avt!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'shop_start_at',
    })
    shop_start_at!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'shop_address',
    })
    shop_address!: string;

    @ForeignKey(() => AppUser)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    user_id!: number;

    @BelongsTo(() => AppUser, 'user_id')
    user!: AppUser;
    @HasMany(() => Merchandise)
    merchandises!: Merchandise[];
}

export default Shop;
