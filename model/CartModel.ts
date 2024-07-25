import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import AppUser from './UserModel';
import Merchandise from './MerchandiseModel';

@Table({
    tableName: 'cart',
    timestamps: false,
})
export class Cart extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'cart_id',
    })
    cart_id!: number;

    @ForeignKey(() => AppUser)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id',
    })
    user_id!: number;

    @ForeignKey(() => Merchandise)
    @Column({
        type: DataType.INTEGER,
        field: 'merchandise_id',
    })
    merchandise_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'cart_merchandise_quantity',
    })
    cart_merchandise_quantity!: number;

    @Column({
        type: DataType.TIME,
        field: 'cart_add_merchandise_time',
    })
    cart_add_merchandise_time!: Date;

    @BelongsTo(() => AppUser)
    User!: AppUser;

    @BelongsTo(() => Merchandise)
    Merchandise!: Merchandise;
}

export default Cart;
