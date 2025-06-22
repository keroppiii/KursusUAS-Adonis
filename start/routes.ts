import router from '@adonisjs/core/services/router'
import Peserta from '#models/peserta'
import Kursus from '#models/kursus'
import Materi from '#models/materi'
import Instruktur from '#models/instruktur'


router.get('/', async ({ view }) => {
  const jumlahPeserta = await Peserta.query().count('* as total')
  const jumlahKursus = await Kursus.query().count('* as total')
  const jumlahMateri = await Materi.query().count('* as total')
  const jumlahInstruktur = await Instruktur.query().count('* as total')

  const peserta = jumlahPeserta[0].$extras.total || 0
  const kursus = jumlahKursus[0].$extras.total || 0
  const materi = jumlahMateri[0].$extras.total || 0
  const instruktur = jumlahInstruktur[0].$extras.total || 0

  return view.render('pages/dashboard', {
    peserta,
    kursus,
    materi,
    instruktur,
  })
})

router.resource('instrukturs', () => import('#controllers/instrukturs_controller'))
router.resource('kursuses', () => import('#controllers/kursuses_controller'))
router.resource('materises', () => import('#controllers/materises_controller'))
router.resource('pesertas', () => import('#controllers/pesertas_controller'))
router.resource('pendaftarans', () => import('#controllers/pendaftarans_controller'))
