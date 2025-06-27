import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Language, Quality } from "src/core/type/types";
import { v4 as uuidv4 } from 'uuid'
import { Movies } from "./movies.models";

@Table({tableName: 'movieFiles'})
export class MovieFiles extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.STRING})
    file_url: string

    @Column({type: DataType.ENUM(...Object.values(Quality))})
    quality: Quality

    @Column({type: DataType.ENUM(...Object.values(Language)), defaultValue: Language.UZ})
    language: Language

    @ForeignKey(() => Movies)
    @Column({type: DataType.UUID, onDelete: 'CASCADE'})
    movie_id: string

    @BelongsTo(() => Movies)
    movie: Movies
}