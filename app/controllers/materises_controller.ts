import type { HttpContext } from '@adonisjs/core/http'
import Materi from '#models/materi'
import Kursus from '#models/kursus'
import Application from '@adonisjs/core/services/app'

export default class MaterisController {
  async index({ view }: HttpContext) {
    const materis = await Materi.query().preload('kursus')
    return view.render('materis/index', { materis })
  }

  async create({ view }: HttpContext) {
    const kursuses = await Kursus.all()
    return view.render('materis/create', { kursuses })
  }

  async store({ request, response }: HttpContext) {
    const data: any = request.only(['judul', 'deskripsi', 'kursusId'])

    const file = request.file('file')

    if (file) {
      const fileName = `${new Date().getTime()}_${file.clientName}`
      await file.move(Application.publicPath('uploads'), { name: fileName })
      data.filePath = `uploads/${fileName}`
    }

    await Materi.create(data)
    return response.redirect().toRoute('materises.index')
  }

  async edit({ params, view }: HttpContext) {
    const materi = await Materi.findOrFail(params.id)
    const kursuses = await Kursus.all()
    return view.render('materis/edit', { materi, kursuses })
  }

  async update({ params, request, response }: HttpContext) {
    const materi = await Materi.findOrFail(params.id)
    const data = request.only(['judul', 'deskripsi', 'kursusId'])
    materi.merge(data)
    await materi.save()
    return response.redirect().toRoute('materises.index')
  }

  async destroy({ params, response }: HttpContext) {
    const materi = await Materi.findOrFail(params.id)
    await materi.delete()
    return response.redirect().toRoute('materises.index')
  }
}
