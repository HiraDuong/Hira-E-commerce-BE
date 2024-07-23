import {
    Table,
    DataType,
    Column,
    Model,
    AllowNull,
    ForeignKey,
} from 'sequelize-typescript';
import Merchandise from './MerchandiseModel';
import Tag from './TagModel';

@Table({
    tableName: 'merchandise_tag',
    timestamps: false,
})
class MerchandiseTag extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'merchandise_tag_id',
    })
    merchandise_tag_id!: number;

    @ForeignKey(() => Merchandise)
    @Column({
        type: DataType.INTEGER,
        field: 'merchandise_id',
        allowNull: false,
    })
    merchandise_id!: number;

    @ForeignKey(() => Tag)
    @Column({
        type: DataType.INTEGER,
        field: 'tag_id',
        allowNull: false,
    })
    tag_id!: number;
}

export default MerchandiseTag;
