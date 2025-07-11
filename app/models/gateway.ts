import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
export default class Gateway extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare is_active: boolean;

  @column()
  declare priority: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;
}

