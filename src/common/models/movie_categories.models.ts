import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { Movies } from "./movies.models";
import { Categories } from "./categories.models";

@Table({tableName: 'movieCategories'})
export class MovieCategories extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @ForeignKey(() => Movies)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    movie_id: string

    @BelongsTo(() => Movies)
    movie: Movies

    @ForeignKey(() => Categories)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    category_id: string

    @BelongsTo(() => Categories)
    category: Categories
}