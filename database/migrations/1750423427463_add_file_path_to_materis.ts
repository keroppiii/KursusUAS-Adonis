import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddFilePathToMateris extends BaseSchema {
  protected tableName = 'materis'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('file_path').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('file_path')
    })
  }
}
