import router from '@adonisjs/core/services/router';
import AuthController from '../controller/http/auth_controller.js';
import { middleware } from '../../../../start/kernel.js';


router.group(() => {
  router.post('/login', [AuthController, 'login'])
  router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  router.post('/register', [AuthController, 'register'])
}).prefix('/auth')
