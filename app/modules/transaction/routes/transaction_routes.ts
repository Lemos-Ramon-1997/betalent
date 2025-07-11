import router from '@adonisjs/core/services/router';
import TransactionController from '../controller/http/transaction_controller.js';
import { middleware } from '../../../../start/kernel.js';
import role from '../../../middleware/role.js';

router.group(() => {
  router.get('/', [TransactionController, 'index'])
  router.post('/show', [TransactionController, 'show'])
  router.post('/refund', [TransactionController, 'refund']).use(middleware.auth()).use(role(['ADMIN','FINANCE']))
  router.post('/store', [TransactionController, 'store'])
}).prefix('/transactions')