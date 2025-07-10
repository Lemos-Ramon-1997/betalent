import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddPriceToProducts extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('price', 10, 2).notNullable().defaultTo(0)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('price')
    })
  }
}
