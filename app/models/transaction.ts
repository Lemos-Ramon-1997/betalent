import { BaseModel, column, } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
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
  declare created_at: DateTime;

}
