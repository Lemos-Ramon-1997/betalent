import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http';
import ErrorResponse from '../../../../utils/error/error_handler.js';

export default class AuthController {
  async register({ request }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator);
      const user = await User.create(data);
      return User.accessTokens.create(user);
    } catch (err) {
      console.error('Error during registration:', err)
      throw new ErrorResponse('Erro ao registrar usuário', 500);
    }
 
  }

  async login({ request }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator);
      const user = await User.verifyCredentials(email, password);
      return User.accessTokens.create(user);
    } catch (err) {
      console.error('Error during login:', err);
      throw new ErrorResponse('Erro ao fazer login', 401);
    }
  }

  async logout({ auth }: HttpContext) {
    try {
      await auth.check();
      const user = auth.user!;
      await User.accessTokens.delete(user, user.currentAccessToken.identifier);
      return { message: 'Logout bem-sucedido' };
    } catch (err) {
      console.error('Error during logout:', err);
      throw new ErrorResponse('Erro ao fazer logout', 500);
    }
  }


}