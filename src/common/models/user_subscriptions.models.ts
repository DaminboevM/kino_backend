import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Status } from "src/core/type/user";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./user.models";
import { SubscriptionPlans } from "./subscription_plans.models";

@Table({tableName: 'user_subscriptions'})
export class UserSubscriptions extends Model {
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.DATE, defaultValue: DataType.NOW })
    start_date: Date;


    @Column({type: DataType.ENUM(...Object.values(Status)), defaultValue: Status.pending_payment})
    status: Status

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    auto_renew: boolean

    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    user_id: string

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => SubscriptionPlans)
    @Column({type: DataType.UUID})
    plan_id: string

    @BelongsTo(() => SubscriptionPlans)
    subscription_plans: SubscriptionPlans
}