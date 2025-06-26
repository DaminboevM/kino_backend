import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { MovieCategories } from "./movie_categories.models";

@Table({tableName: 'categories'})
export class Categories extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.STRING})
    name: string

    @Column({type: DataType.STRING, unique: true})
    slug: string

    @Column({type: DataType.TEXT})
    description: string

    @HasMany(() => MovieCategories)
    movieCategories: MovieCategories[]    
}