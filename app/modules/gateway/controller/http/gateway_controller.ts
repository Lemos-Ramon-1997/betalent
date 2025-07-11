import type { HttpContext } from '@adonisjs/core/http'
import GatewayService from '../../services/gateway_service.js'
import ErrorResponse from '../../../../utils/error/error_handler.js'
import { gatewayStoreValidator, gatewayUpdateValidator } from '../../validators/gateway_validator.js';
import { translateVineMessages } from '../../../../utils/translate_vine_messages.js';
import * as helper from '../../../../utils/helper/helper.js';

const gatewayService = new GatewayService()

export default class GatewayController {
  async index() {
    try {
      return await gatewayService.all() ?? [];
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
      helper.checkRequiredParams(request, ['name', 'is_active', 'priority']);
      const data = await request.validateUsing(gatewayStoreValidator);
      return await gatewayService.create(data);
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
      return await gatewayService.findOrFail(id);
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
      const data = await request.validateUsing(gatewayUpdateValidator);
      const { id, ...updateFields } = data;
      return await gatewayService.update(id, updateFields);
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
      return await gatewayService.delete(id);
    } catch (err) {
      if (err instanceof ErrorResponse) {
        throw err;
      } else {
        throw new ErrorResponse('Erro interno');
      }
    }
  }


}
