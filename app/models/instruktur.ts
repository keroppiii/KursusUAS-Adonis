import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Kursus from '#models/kursus' 

export default class Instruktur extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare email: string

  @hasMany(() => Kursus)
  declare kursuses: HasMany<typeof Kursus>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}