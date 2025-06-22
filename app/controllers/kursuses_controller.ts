import type { HttpContext } from '@adonisjs/core/http'
import Kursus from '#models/kursus'
import Instruktur from '#models/instruktur'

export default class KursusesController {
  async index({ view }: HttpContext) {
    const kursuses = await Kursus.query().preload('instruktur')
    return view.render('kursuses/index', { kursuses })
  }

  async create({ view }: HttpContext) {
    const instrukturs = await Instruktur.all()
    return view.render('kursuses/create', { instrukturs })
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['namaKursus', 'durasi', 'biaya', 'instrukturId'])
    await Kursus.create(data)
    return response.redirect().toRoute('kursuses.index')
  }

  async edit({ params, view }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    const instrukturs = await Instruktur.all()
    return view.render('kursuses/edit', { kursus, instrukturs })
  }

  async update({ params, request, response }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    const data = request.only(['namaKursus', 'durasi', 'biaya', 'instrukturId'])
    kursus.merge(data)
    await kursus.save()
    return response.redirect().toRoute('kursuses.index')
  }

  async destroy({ params, response }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.id)
    await kursus.delete()
    return response.redirect().toRoute('kursuses.index')
  }
}
