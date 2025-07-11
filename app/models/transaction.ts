import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import Product from './product.js';
export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id!: number;

  @column()
  public client!: number;

  @column()
  public gateway!: number;

  @column()
  public external_id!: string;

  @column()
  public status!: string;

  @column()
  public amount!: number;

  @column()
  public card_last_numbers!: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @manyToMany(() => Product, {
    pivotTable: 'transaction_products',
    localKey: 'id',
    pivotForeignKey: 'transaction_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'product_id',
  })
  public products: any;

}
