import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserRole } from "src/core/type/user";
import { v4 as uuidv4 } from 'uuid'
import { Profile } from "./profile.models";
import { UserSubscriptions } from "./user_subscriptions.models";

@Table({tableName: 'users'})
export class User extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.STRING, unique: true})
    username: string

    @Column({type: DataType.STRING, unique: true})
    email: string

    @Column({type: DataType.STRING})
    password: string

    @Column({type: DataType.ENUM(...Object.values(UserRole)), defaultValue: UserRole.USER})
    role: UserRole

    @Column({type: DataType.STRING, defaultValue: null})
    avatar_url: string

    @HasMany(() => Profile)
    profiles: Profile[]

    @HasMany(() => UserSubscriptions)
    user_subscriptions: UserSubscriptions
}