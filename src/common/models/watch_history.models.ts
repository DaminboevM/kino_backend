import { BeforeUpdate, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./user.models";
import { Movies } from "./movies.models";

@Table({tableName: 'watchHistory'})
export class WatchHistory extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.INTEGER})
    declare watched_duration: number
    
    @Column({type: DataType.INTEGER})
    declare watched_percentage: number

    @Column({type: DataType.DATE,defaultValue: DataType.NOW})
    declare last_watched: Date;

    @ForeignKey(() => Movies)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    declare movie_id: string

    @BelongsTo(() => Movies)
    movie: Movies
    
    @ForeignKey(() => User)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    declare user_id: string

    @BelongsTo(() => User)
    user: User
}