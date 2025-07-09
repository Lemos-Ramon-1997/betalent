
import router from '@adonisjs/core/services/router'
import ProductController from '../controller/http/product_controller.js'
import { middleware } from '../../../../start/kernel.js'
import role from '../../../middleware/role.js'

router.group(() => {
  router.get('/', [ProductController, 'index']).use(role(['ADMIN', 'MANAGER', 'FINANCE']))
  router.post('/', [ProductController, 'store']).use(role(['ADMIN', 'MANAGER', 'FINANCE']))
  router.post('/show', [ProductController, 'show']).use(role(['ADMIN', 'MANAGER', 'FINANCE']))
  router.post('/update', [ProductController, 'update']).use(role(['ADMIN', 'MANAGER', 'FINANCE']))
  router.post('/delete', [ProductController, 'destroy']).use(role(['ADMIN', 'MANAGER', 'FINANCE']))
}).prefix('/products').use(middleware.auth())