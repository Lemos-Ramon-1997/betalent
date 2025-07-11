import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_products'

  async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('transaction_id').unsigned().notNullable().references('id').inTable('transactions')
      table.integer('product_id').unsigned().notNullable().references('id').inTable('products')
      table.integer('quantity').unsigned().notNullable()
      table.timestamps(true)
    })
  }

  async down () {
    this.schema.dropTable(this.tableName)
  }
}
