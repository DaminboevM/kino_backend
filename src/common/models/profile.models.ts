import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./user.models";

@Table({tableName: 'profile'})
export class Profile extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.STRING})
    full_name: string

    @Column({type: DataType.STRING(20)})
    phone: string

    @Column({type: DataType.STRING(50)})
    country: string

    @ForeignKey(() => User)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    user_id: string

    @BelongsTo(() => User)
    user: User
}