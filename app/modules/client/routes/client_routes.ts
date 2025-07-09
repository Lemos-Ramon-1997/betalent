
import router from '@adonisjs/core/services/router'
import ClientController from '../controller/http/client_controller.js'
import { middleware } from '../../../../start/kernel.js'
import role from '../../../middleware/role.js'

router.group(() => {
  router.get('/', [ClientController, 'index']).use(role(['ADMIN', 'MANAGER']))
  router.post('/', [ClientController, 'store']).use(role(['ADMIN', 'MANAGER']))
  router.post('/show', [ClientController, 'show']).use(role(['ADMIN', 'MANAGER']))
  router.post('/update', [ClientController, 'update']).use(role(['ADMIN', 'MANAGER']))
  router.post('/delete', [ClientController, 'destroy']).use(role(['ADMIN', 'MANAGER']))
}).prefix('/clients').use(middleware.auth())