import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { Movies } from "./movies.models";
import { User } from "./user.models";

@Table({tableName: 'favorites'})
export class Favorites extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @ForeignKey(() => Movies)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    movie_id: string

    @BelongsTo(() => Movies)
    movie: Movies

    @ForeignKey(() => User)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    user_id: string

    @BelongsTo(() => User)
    user: User
}