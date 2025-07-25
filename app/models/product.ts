import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare amount: number;

  @column()
  declare price: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;


}

