import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kursuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_kursus').notNullable()
      table.string('durasi').notNullable()
      table.decimal('biaya', 10, 2).notNullable()

      table
        .integer('instruktur_id')
        .unsigned()
        .references('id')
        .inTable('instrukturs')
        .onDelete('CASCADE')

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
