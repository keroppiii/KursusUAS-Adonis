import type { HttpContext } from '@adonisjs/core/http'
import Peserta from '#models/peserta'

export default class PesertasController {
  async index({ view }: HttpContext) {
    const pesertas = await Peserta.all()
    return view.render('pesertas/index', { pesertas })
  }

  async create({ view }: HttpContext) {
    return view.render('pesertas/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'email'])
    await Peserta.create(data)
    return response.redirect().toRoute('pesertas.index')
  }

  async edit({ params, view }: HttpContext) {
    const peserta = await Peserta.findOrFail(params.id)
    return view.render('pesertas/edit', { peserta })
  }

  async update({ params, request, response }: HttpContext) {
    const peserta = await Peserta.findOrFail(params.id)
    const data = request.only(['nama', 'email'])
    peserta.merge(data)
    await peserta.save()
    return response.redirect().toRoute('pesertas.index')
  }

  async destroy({ params, response }: HttpContext) {
    const peserta = await Peserta.findOrFail(params.id)
    await peserta.delete()
    return response.redirect().toRoute('pesertas.index')
  }
}
