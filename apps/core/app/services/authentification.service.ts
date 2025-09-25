import { inject } from '@adonisjs/core'

import type { CredentialDTO } from '@mindboard/shared'
import { HttpContext } from '@adonisjs/core/http'
import UserValidation from '#services/authenticate.user'
import { AuthentificationCommand } from '#commands/authentification.command'
import Authenticate from '#services/authenticate'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class AuthentificationService {
  constructor(
    private userValidation: UserValidation,
    private authentication: Authenticate
  ) {}

  async authenticate(credentials: CredentialDTO, ctx: HttpContext): Promise<void> {
    logger.info('authenticate user')
    try {
      const validationCommand = new AuthentificationCommand({
        ...credentials,
      })

      const validatedUser = await this.userValidation.execute(validationCommand)
      if (!validatedUser) {
        return
      }

      await this.authentication.execute(validatedUser, ctx)
    } catch (error) {
      logger.error('authentification failed to authenticate: ' + error)
      throw error
    }
  }
}
