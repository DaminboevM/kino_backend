import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { SubscriptionType } from "src/core/type/types";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./user.models";
import { MovieCategories } from "./movie_categories.models";
import { MovieFiles } from "./movie_files.models";
import { Favorites } from "./favorites.models";
import { Rewievs } from "./reviews.models";
import { WatchHistory } from "./watch_history.models";

@Table({tableName: 'movies'})
export class Movies extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.STRING})
    title: string

    @Column({type: DataType.STRING, unique: true})
    slug: string

    @Column({type: DataType.TEXT})
    description: string

    @Column({type: DataType.INTEGER})
    release_year: number

    @Column({type: DataType.INTEGER})
    duration_minutes: number

    @Column({type: DataType.STRING})
    poster_url: string

    @Column({type: DataType.DECIMAL(3,1)})
    rating: number

    @Column({type: DataType.ENUM(...Object.values(SubscriptionType)), defaultValue: SubscriptionType.free})
    subscription_type: SubscriptionType

    @Column({type: DataType.INTEGER, defaultValue: 0})
    view_count: number

    @ForeignKey(() => User)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    created_by: string

    @BelongsTo(() => User)
    user: User

    @HasMany(() => MovieCategories)
    movieCategory: MovieCategories[]

    @HasMany(() => MovieFiles)
    moviesFiles: MovieFiles[]

    @HasMany(() => Favorites)
    favorites: Favorites[]

    @HasMany(() => Rewievs)
    rewievs: Rewievs[]

    @HasMany(() => WatchHistory)
    watchHistory: WatchHistory
}