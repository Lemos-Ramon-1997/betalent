import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Transaction from './transaction.js';

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare email: string;

  @hasMany(() => Transaction, { foreignKey: 'client' })
  declare transactions: HasMany<typeof Transaction>;
}