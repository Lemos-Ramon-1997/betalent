import router from '@adonisjs/core/services/router'
import GatewayController from '../controller/http/gateway_controller.js'
import { middleware } from '../../../../start/kernel.js'

router.group(() => {
  router.get('/', [GatewayController, 'index'])
  router.post('/', [GatewayController, 'store'])
  router.post('/show', [GatewayController, 'show'])
  router.post('/update', [GatewayController, 'update'])
  router.post('/delete', [GatewayController, 'destroy'])
}).prefix('/gateways').use(middleware.auth())



