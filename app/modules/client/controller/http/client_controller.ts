import type { HttpContext } from '@adonisjs/core/http';
import ClientService from '../../services/client_service.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import logger from '@adonisjs/core/services/logger';
import * as helper from '../../../../utils/helper/helper.js';


const clientService = new ClientService();

export default class ClientController {
  async index() {
    try {
      return await clientService.all() ?? [];
    } catch (err) {
      logger.error('Error fetching clients:', err);
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }

  async store({ request }: HttpContext) {
    try {
      helper.checkRequiredParams(request, ['name', 'email']);
      const data = request.only(['name', 'email']);
      return await clientService.create(data);
    } catch (err) {
      logger.error('Error creating client:', err);
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
      return await clientService.findOrFail(id);
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
      const { id, name, email } = request.all();
      const updateFields = Object.fromEntries(
        Object.entries({ name, email }).filter(([_, value]) => value)
      );
      return await clientService.update(id, updateFields);
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
      return await clientService.delete(id);
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }
  
}
