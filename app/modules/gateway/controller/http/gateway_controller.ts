import type { HttpContext } from '@adonisjs/core/http'
import GatewayService from '../../services/gateway_service.js'
import ErrorResponse from '../../../../utils/error/error_handler.js'
import logger from '@adonisjs/core/services/logger'
import * as helper from '../../../../utils/helper/helper.js'

const gatewayService = new GatewayService()

export default class GatewayController {
  async index() {
    try {
      return await gatewayService.all() ?? [];
    } catch (err) {
      logger.error('Error fetching gateways:', err);
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
      const data = request.only(['name', 'is_active', 'priority']);
      return await gatewayService.create(data);
    } catch (err) {
      logger.error('Error creating gateway:', err);
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
      const { id, name, is_active, priority } = request.all();
      let updateFields = Object.fromEntries(
        Object.entries({ name, priority }).filter(([_, value]) => value !== undefined && value !== null)
      );
      if (is_active === true || is_active === false) {
        updateFields.is_active = is_active;
      }
      return await gatewayService.update(id, updateFields);
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
