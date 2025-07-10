import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client').unsigned().notNullable()
      table.integer('gateway').unsigned().notNullable()
      table.string('external_id').notNullable()
      table.string('status').notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.string('card_last_numbers', 4).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
