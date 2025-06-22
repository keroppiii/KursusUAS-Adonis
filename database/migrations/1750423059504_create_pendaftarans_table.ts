import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pendaftarans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('peserta_id')
        .unsigned()
        .references('id')
        .inTable('pesertas')
        .onDelete('CASCADE')

      table
        .integer('kursus_id')
        .unsigned()
        .references('id')
        .inTable('kursuses')
        .onDelete('CASCADE')

      table.string('status').notNullable()

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
