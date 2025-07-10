import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class TransactionProduct extends BaseModel {
  @column({ isPrimary: true })
  public id!: number;

  @column()
  public transaction_id!: number;

  @column()
  public product_id!: number;

  @column()
  public quantity!: number;
}
