import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'materis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('kursus_id')
        .unsigned()
        .references('id')
        .inTable('kursuses')
        .onDelete('CASCADE')

      table.string('judul').notNullable()
      table.text('deskripsi').notNullable()

      table.string('file').nullable()

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
