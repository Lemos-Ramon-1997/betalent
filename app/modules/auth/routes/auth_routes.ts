import router from '@adonisjs/core/services/router'
import AuthController from '../controller/http/auth_controller.js'

router.group(() => {
  router.post('/login', [AuthController, 'login'])
}).prefix('/auth')
