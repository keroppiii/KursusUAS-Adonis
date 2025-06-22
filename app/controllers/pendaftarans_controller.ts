import type { HttpContext } from '@adonisjs/core/http'
import Pendaftaran from '#models/pendaftaran'
import Peserta from '#models/peserta'
import Kursus from '#models/kursus'

export default class PendaftaransController {
  async index({ view }: HttpContext) {
    const pendaftarans = await Pendaftaran.query().preload('peserta').preload('kursus')
    return view.render('pendaftarans/index', { pendaftarans })
  }

  async create({ view }: HttpContext) {
    const pesertas = await Peserta.all()
    const kursuses = await Kursus.all()
    return view.render('pendaftarans/create', { pesertas, kursuses })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['pesertaId', 'kursusId', 'status'])
    await Pendaftaran.create({
      pesertaId: data.pesertaId,
      kursusId: data.kursusId,
      status: data.status,
    })
    return response.redirect().toRoute('pendaftarans.index')
  }

  async destroy({ params, response }: HttpContext) {
    const pendaftaran = await Pendaftaran.findOrFail(params.id)
    await pendaftaran.delete()
    return response.redirect().toRoute('pendaftarans.index')
  }
}
