import type { HttpContext } from '@adonisjs/core/http';
import UserService from '../../services/user_service.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import logger from '@adonisjs/core/services/logger';
import * as helper from '../../../../utils/helper/helper.js';


const userService = new UserService();

export default class UserController {
  async index() {
    try {
      return await userService.all() ?? [];
    } catch (err) {
      logger.error('Error fetching users:', err);
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async store({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['name', 'surname', 'email', 'role', 'password']);
      const data = request.only(['name', 'surname', 'email', 'role', 'password']);
      return await userService.create(data);
    } catch (err) {
      logger.error('Error creating user:', err);
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno')
      }
    }
  }

  async show({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['id']);
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
      helper.checkRequiredParams(request, ['id']);
      const { id, name,  surname, email, role, password } = request.all();
      const updateFields = Object.fromEntries(
        Object.entries({  name,  surname, email, role, password }).filter(([_, value]) => value)
      ); 
      return await userService.update(id, updateFields);
    } catch (err) {
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
