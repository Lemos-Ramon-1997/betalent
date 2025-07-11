import router from '@adonisjs/core/services/router'
import TransactionController from '../controller/http/transaction_controller.js';
import { middleware } from '../../../../start/kernel.js'


router.group(() => {
  router.get('/', [TransactionController, 'index']).use(middleware.auth())
  router.post('/show', [TransactionController, 'show']).use(middleware.auth())
  router.post('/refund', [TransactionController, 'refund'])
  router.post('/store', [TransactionController, 'store'])
}).prefix('/transactions')