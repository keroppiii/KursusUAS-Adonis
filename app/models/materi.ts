import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Kursus from './kursus.js'

export default class Materi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare kursusId: number

  @column()
  declare judul: string

  @column()
  declare deskripsi: string

  @belongsTo(() => Kursus)
  declare kursus: BelongsTo<typeof Kursus>

  @column()
  declare filePath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
