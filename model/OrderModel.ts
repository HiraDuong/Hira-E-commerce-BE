import {
    Model,
    Table,
    ForeignKey,
    Column,
    DataType,
    BelongsTo,
    BelongsToMany,
} from 'sequelize-typescript';
import AppUser from './UserModel';
import Bill from './BillModel';
import Merchandise from './MerchandiseModel';
import Shop from './ShopModel';

@Table({
    tableName: 'user_order',
    timestamps: false,
})
export class UserOrder extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'order_id',
    })
    order_id!: number;

    @Column({
        type: DataType.DATE,
        field: 'order_date',
    })
    order_date!: Date;

    @Column({
        type: DataType.INTEGER,
        field: 'order_merchandise_quantity',
    })
    order_merchandise_quantity!: number;
    @ForeignKey(() => AppUser)
    @Column({
        type: DataType.INTEGER,
        field: 'user_id',
    })
    user_id!: number;

    @ForeignKey(() => Merchandise)
    @Column({
        type: DataType.INTEGER,
        field: 'merchandise_id',
    })
    merchandise_id!: number;

    @ForeignKey(() => Bill)
    @Column({
        type: DataType.INTEGER,
        field: 'bill_id',
    })
    bill_id!: number;

    @BelongsTo(() => AppUser, 'user_id')
    user!: AppUser;

    @BelongsTo(() => Merchandise, 'merchandise_id')
    merchandise!: Merchandise;

    @BelongsTo(() => Bill, 'bill_id')
    bill!: Bill;
}

export default UserOrder;
