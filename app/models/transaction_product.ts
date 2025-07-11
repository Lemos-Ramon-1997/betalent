import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import Product from '#models/product';
import { DateTime } from 'luxon';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class TransactionProduct extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare transaction_id: number;

    @column()
    declare product_id: number;

    @column()
    declare quantity: number;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @belongsTo(() => Product, {
      foreignKey: 'product_id',
    })
    public product!: BelongsTo<typeof Product>;
}