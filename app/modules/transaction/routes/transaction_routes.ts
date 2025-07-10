import router from '@adonisjs/core/services/router'
import TransactionController from '../controller/http/transaction_controller.js';
import { middleware } from '../../../../start/kernel.js'


router.group(() => {
  router.get('/', [TransactionController, 'index'])
  router.post('/show', [TransactionController, 'show'])
    router.post('/store', [TransactionController, 'store'])
}).prefix('/transactions').use(middleware.auth())