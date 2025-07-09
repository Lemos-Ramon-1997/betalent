
import router from '@adonisjs/core/services/router'
import UserController from '../controller/http/user_controller.js'
import { middleware } from '../../../../start/kernel.js'
import role from '../../../middleware/role.js'

router.group(() => {
  router.get('/', [UserController, 'index']).use(role(['ADMIN', 'MANAGER']))
  router.post('/', [UserController, 'store']).use(role(['ADMIN', 'MANAGER']))
  router.post('/show', [UserController, 'show']).use(role(['ADMIN', 'MANAGER']))
  router.post('/update', [UserController, 'update']).use(role(['ADMIN', 'MANAGER']))
  router.post('/delete', [UserController, 'destroy']).use(role(['ADMIN', 'MANAGER']))
  router.get('/me', [UserController, 'me']) 
}).prefix('/users').use(middleware.auth())