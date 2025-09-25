import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import {
  CredentialDTO,
  ApiResponse,
  HTTPStatusUnprocessableEntity,
  HTTPStatusServerError, HTTPStatusOK,
} from '@mindboard/shared'
import { validateData, loginUserCredentialSchema } from '@mindboard/shared'
import logger from '@adonisjs/core/services/logger'
import AuthentificationService from '#application/authentification.service'

@inject()
export default class AuthAdapter {
  constructor(protected authentificationService: AuthentificationService) {}

  async handleLogin(ctx: HttpContext): Promise<ApiResponse> {
    const { request } = ctx
    logger.info(`body: ${request.body()}`)

    try {
      const validationResult = await validateData<CredentialDTO>(
        loginUserCredentialSchema,
        request.body()
      )

      if (!validationResult.success) {
        logger.warn('validation failed: ' + validationResult.errors)
        return {
          success: false,
          code: HTTPStatusUnprocessableEntity,
          message: 'validation failed',
          errors: validationResult.errors,
        }
      }

      await this.authentificationService.authenticate(validationResult.data, ctx)
      return {
        success: true,
        code: 200, // okstatus from pr
      }
    } catch (err) {
      logger.error('error login user' + err)
      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'internal server error',
      }
    }
  }

  async handleLogout(ctx: HttpContext): Promise<ApiResponse> {
    try {
      await this.authentificationService.logout(ctx)
      return {
        success: true,
        code: HTTPStatusOK,
      }
    } catch (err) {
      return {
        success: false,
        code: HTTPStatusServerError,
        message: 'internal server error',
      }
    }
  }
}
