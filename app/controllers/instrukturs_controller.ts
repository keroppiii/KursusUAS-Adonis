import type { HttpContext } from '@adonisjs/core/http'
import Instruktur from '#models/instruktur'

export default class InstruktursController {
  async index({ view }: HttpContext) {
  const instrukturs = await Instruktur.all()
  return view.render('instrukturs/index', { instrukturs })
  }

  async create({ view }: HttpContext) {
    return view.render('instrukturs/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'email'])
    await Instruktur.create(data)
    return response.redirect().toRoute('instrukturs.index')
    console.log('Data yang dikirim:', data)
  }

  async edit({ params, view }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    return view.render('instrukturs/edit', { instruktur })
  }

  async update({ params, request, response }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    const data = request.only(['nama', 'email'])
    instruktur.merge(data)
    await instruktur.save()
    return response.redirect().toRoute('instrukturs.index')
  }

  async destroy({ params, response }: HttpContext) {
    const instruktur = await Instruktur.findOrFail(params.id)
    await instruktur.delete()
    return response.redirect().toRoute('instrukturs.index')
  }
}