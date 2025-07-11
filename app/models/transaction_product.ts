import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

export default class TransactionProduct extends BaseModel {
    @column({ isPrimary: true })
    public id!: number;

    @column()
    public transaction_id!: number;

    @column()
    public product_id!: number;

    @column()
    public quantity!: number;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;
}
