import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./user.models";
import { Movies } from "./movies.models";

@Table({tableName: 'rewievs'})
export class Rewievs extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.DECIMAL(2,1)})
    rating: number

    @Column({type: DataType.TEXT})
    comment: string

    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    user_id: string

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Movies)
    @Column({type: DataType.UUID})
    movie_id: string

    @BelongsTo(() => Movies)
    movie: Movies
}