import type { HttpContext } from '@adonisjs/core/http';
import UserService from '../../services/user_service.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import { userStoreValidator, userUpdateValidator } from '../../validators/user_validator.js';
import { translateVineMessages } from '../../../../utils/error/translate_vine_messages.js';


const userService = new UserService();

export default class UserController {
  async index() {
    try {
      return await userService.all() ?? [];
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async store({ request }: HttpContext) {
    try {
      const data = await request.validateUsing(userStoreValidator);
      return await userService.create(data);
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

  async show({ request }: HttpContext) {
    try {
      const { id } = request.only(['id']);
      return await userService.findOrFail(id);
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async update({ request }: HttpContext) {
    try {
      const data = await request.validateUsing(userUpdateValidator);
      const { id, ...updateFields } = data;
      return await userService.update(id, updateFields);
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

  async destroy({ request }: HttpContext) {
    try {
      const { id } = request.only(['id']);
      return await userService.delete(id);
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async me({ auth }: HttpContext) {
    return {
      user: auth.user,
    }
  }

  
}
