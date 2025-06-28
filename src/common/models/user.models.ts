import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { UserRole } from "src/core/type/types";
import { v4 as uuidv4 } from 'uuid'
import { UserSubscriptions } from "./user_subscriptions.models";
import { Favorites } from "./favorites.models";
import { Rewievs } from "./reviews.models";
import { Movies } from "./movies.models";
import { WatchHistory } from "./watch_history.models";

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

    @Column({type: DataType.ENUM(...Object.values(UserRole)), defaultValue: UserRole.SUPERADMIN})
    role: UserRole

    @Column({type: DataType.STRING, defaultValue: null})
    avatar_url: string

    @Column({type: DataType.STRING(20), defaultValue: null})
    phone: string

    @Column({type: DataType.STRING(50), defaultValue: null})
    country: string

    @HasMany(() => UserSubscriptions)
    user_subscriptions: UserSubscriptions[]

    @HasMany(() => Favorites)
    favorites: Favorites[]

    @HasMany(() => Rewievs)
    rewievs: Rewievs[]

    @HasMany(() => Movies)
    movie: Movies[]

    @HasMany(() => WatchHistory)
    watch_history: WatchHistory[]

    
}