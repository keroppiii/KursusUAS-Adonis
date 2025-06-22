import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Instruktur from '#models/instruktur'

export default class Kursus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'nama_kursus' })
  declare namaKursus: string

  @column()
  declare durasi: string

  @column()
  declare biaya: number

  @column({ columnName: 'instruktur_id' })
  declare instrukturId: number

  @belongsTo(() => Instruktur)
  declare instruktur: BelongsTo<typeof Instruktur>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
