import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Shop from './ShopModel';

@Table({
    tableName: 'merchandise',
    timestamps: false,
})
export class Merchandise extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field:'merchandise_id' as string,
    })
    merchandise_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field:'merchandise_name' as string,
    })
    merchandise_name!: string;

    @ForeignKey(() => Shop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field:'shop_id' as string,
    })
    shop_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field:'merchandise_in_stock_quantity' as string,
    })
    merchandise_in_stock_quantity!: number;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field:'merchandise_sold_quantity' as string,
        defaultValue: 0,
    })
    merchandise_sold_quantity!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field:'merchandise_description' as string,
    })
    merchandise_description!: string;
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        field:'merchandise_price' as string,
    })
    merchandise_price!: number;
    
    @Column({
        type:DataType.STRING(255),
        allowNull: false,
        field:'merchandise_img' as string,
    })
    merchandise_img!: string;
    @BelongsTo(() => Shop,'shop_id')
    shop!: Shop;
}

export default Merchandise;
