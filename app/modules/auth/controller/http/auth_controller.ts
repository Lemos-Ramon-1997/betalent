import User from '#models/user';
import { loginValidator, registerValidator } from '../../validators/auth.js';
import type { HttpContext } from '@adonisjs/core/http';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import { translateVineMessages } from '../../../../utils/error/translate_vine_messages.js';
import * as helper from '../../../../utils/helper/helper.js';

export default class AuthController {
  async register({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['name', 'surname', 'email', 'role', 'password']);
      const data = await request.validateUsing(registerValidator);
      const user = await User.create(data);
      return User.accessTokens.create(user);
    } catch (err: any) {
      if (err?.status === 422 && err?.code === 'E_VALIDATION_ERROR') {
        const mensagens = translateVineMessages(err.messages);
        throw new ErrorResponse(mensagens, 422);
      }
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
 
  }

  async login({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['email', 'password']);
      const { email, password } = await request.validateUsing(loginValidator);
      const user = await User.verifyCredentials(email, password);
      return User.accessTokens.create(user);
    } catch (err: any) {
      if (err?.status === 422 && err?.code === 'E_VALIDATION_ERROR') {
        const mensagens = translateVineMessages(err.messages);
        throw new ErrorResponse(mensagens, 422);
      }
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro ao fazer login', 500);
      }
    }
  }

  async logout({ auth }: HttpContext) {
    try {
      await auth.check();
      const user = auth.user!;
      await User.accessTokens.delete(user, user.currentAccessToken.identifier);
      return { message: 'Logout bem-sucedido' };
    } catch (err) {
      throw new ErrorResponse('Erro ao fazer logout', 500);
    }
  }


}