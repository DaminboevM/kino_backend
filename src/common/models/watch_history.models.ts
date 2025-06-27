import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./user.models";
import { Movies } from "./movies.models";

@Table({tableName: 'watchHistory'})
export class WatchHistory extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.INTEGER})
    watched_duration: number
    
    @Column({type: DataType.DECIMAL(5,2)})
    watched_percentage: number
    
    @Column({type: DataType.DATE,defaultValue: DataType.NOW})
    last_watched: Date;

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