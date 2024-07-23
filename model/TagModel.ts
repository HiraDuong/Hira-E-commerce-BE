import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import Merchandise from './MerchandiseModel';
import MerchandiseTag from './MerchandiseTagModel';

@Table({
    tableName: 'tag',
    timestamps: false,
})
export class Tag extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'tag_id',
    })
    tag_id!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
        field: 'tag_name',
    })
    tag_name!: string;
    @BelongsToMany(() => Merchandise, () => MerchandiseTag)
    Merchandises!: Merchandise[];
    @HasMany(() => MerchandiseTag)
    MerchandiseTags!: Tag[];
}

export default Tag;
