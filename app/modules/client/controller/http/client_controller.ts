import type { HttpContext } from '@adonisjs/core/http';
import ClientService from '../../services/client_service.js';
import ErrorResponse from '../../../../utils/error/error_handler.js';
import { clientStoreValidator, clientUpdateValidator } from '../../validators/client_validator.js';
import { translateVineMessages } from '../../../../utils/translate_vine_messages.js';
import * as helper from '../../../../utils/helper/helper.js';

const clientService = new ClientService();

export default class ClientController {
  async index() {
    try {
      return await clientService.all() ?? [];
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
      helper.checkRequiredParams(request, ['name', 'email']);
      const data = await request.validateUsing(clientStoreValidator);
      return await clientService.create(data);
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
      const data = await request.validateUsing(clientUpdateValidator);
      const { id, ...updateFields } = data;
      return await clientService.update(id, updateFields);
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
      helper.checkRequiredParams(request, ['id']);
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
