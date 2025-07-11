import router from '@adonisjs/core/services/router';
import GatewayController from '../controller/http/gateway_controller.js';
import { middleware } from '../../../../start/kernel.js';
import role from '../../../middleware/role.js';

router.group(() => {
  router.get('/', [GatewayController, 'index']).use(role(['ADMIN', 'MANAGER']))
  router.post('/', [GatewayController, 'store']).use(role(['ADMIN', 'MANAGER']))
  router.post('/show', [GatewayController, 'show']).use(role(['ADMIN', 'MANAGER']))
  router.post('/update', [GatewayController, 'update']).use(role(['ADMIN', 'MANAGER']))
  router.post('/delete', [GatewayController, 'destroy']).use(role(['ADMIN', 'MANAGER']))
}).prefix('/gateways').use(middleware.auth())



