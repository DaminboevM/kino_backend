import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { PaymentMethod, PymentStatus } from "src/core/type/types";
import { v4 as uuidv4 } from 'uuid'
import { UserSubscriptions } from "./user_subscriptions.models";

@Table({tableName: 'payments'})
export class Payments extends Model{
    @Column({type: DataType.UUID, defaultValue: uuidv4(), primaryKey: true})
    declare id: string

    @Column({type: DataType.DECIMAL(10,2)})
    amount: number

    @Column({type: DataType.ENUM(...Object.values(PaymentMethod))})
    payment_method: PaymentMethod

    @Column({type: DataType.JSON})
    payment_details: Record<string, (string | boolean | number)>

    @Column({type: DataType.ENUM(...Object.values(PymentStatus))})
    status: PymentStatus

    @Column({type: DataType.STRING})
    external_transaction_id: string

    @ForeignKey(() => UserSubscriptions)
    @Column({type: DataType.UUID})
    user_subscription_id: string

    @BelongsTo(() => UserSubscriptions)
    user_subscriptions: UserSubscriptions
}