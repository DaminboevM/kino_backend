import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid'
import { UserSubscriptions } from "./user_subscriptions.models";

@Table({tableName: 'subscription_plans'})
export class SubscriptionPlans extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.STRING(50)})
    name: string

    @Column({type: DataType.DECIMAL(10,2)})
    price: number

    @Column({type: DataType.INTEGER})
    duration_days: number

    @Column({type: DataType.JSON})
    features: JSON

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    is_active: boolean

    @HasMany(() => UserSubscriptions)
    user_subscriptions: UserSubscriptions[]
}