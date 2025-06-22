import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Peserta from './peserta.js'
import Kursus from './kursus.js'

export default class Pendaftaran extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pesertaId: number

  @column()
  declare kursusId: number

  @column()
  declare status: string

  @belongsTo(() => Peserta)
  declare peserta: BelongsTo<typeof Peserta>

  @belongsTo(() => Kursus)
  declare kursus: BelongsTo<typeof Kursus>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
