import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import Shop from './ShopModel';
import Tag from './TagModel';
import MerchandiseTag from './MerchandiseTagModel';

@Table({
    tableName: 'merchandise',
    timestamps: false,
})
export class Merchandise extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'merchandise_id',
    })
    merchandise_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'merchandise_name',
    })
    merchandise_name!: string;

    @ForeignKey(() => Shop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'shop_id',
    })
    shop_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'merchandise_in_stock_quantity',
    })
    merchandise_in_stock_quantity!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'merchandise_sold_quantity',
        defaultValue: 0,
    })
    merchandise_sold_quantity!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
        field: 'merchandise_description',
    })
    merchandise_description!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        field: 'merchandise_price',
    })
    merchandise_price!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'merchandise_img',
    })
    merchandise_img!: string;

    @BelongsTo(() => Shop)
    Shop!: Shop;

    @BelongsToMany(() => Tag, () => MerchandiseTag)
    Tags!: Tag[];
}

export default Merchandise;
