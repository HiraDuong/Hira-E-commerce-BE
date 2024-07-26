import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import AppUser from './UserModel';
import UserOrder from './OrderModel';

@Table({
    tableName: 'bill',
    timestamps: false,
})
export class Bill extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'bill_id',
    })
    bill_id!: number;

    @Column({
        type: DataType.DATE,
        field: 'bill_created_at',
        defaultValue: DataType.NOW,
    })
    bill_created_at!: Date;

    @Column({
        type: DataType.DATE,
        field: 'bill_payed_at',
    })
    bill_payed_at?: Date;

    @Column({
        type: DataType.STRING(255),
        field: 'bill_payment_method',
        allowNull: false,
        defaultValue: 'cod',
    })
    bill_payment_method!: string;

    @Column({
        type: DataType.FLOAT,
        field: 'bill_total_price',
        allowNull: false,
        defaultValue: 0,
    })
    bill_total_price!: number;

    @Column({
        type: DataType.FLOAT,
        field: 'bill_discount_percentage',
        allowNull: false,
        defaultValue: 0,
    })
    bill_discount_percentage!: number;

    @ForeignKey(() => AppUser)
    @Column({
        type: DataType.INTEGER,
        field: 'user_id',
        allowNull: false,
    })
    user_id!: number;

    @BelongsTo(() => AppUser)
    User!: AppUser;

    @HasMany(() => UserOrder, { foreignKey: 'bill_id' })
    UserOrders!: UserOrder[];
}

export default Bill;
