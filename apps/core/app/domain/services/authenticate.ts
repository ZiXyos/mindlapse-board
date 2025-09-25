import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import {AuthentificationCommand} from "#commands/authentification.command";
import UserEntity from "#entities/user.entity";
import UserModel from "#models/user";

@inject()
export default class Authenticate {
  async execute(userEntity: UserEntity, { auth }: HttpContext): Promise<void> {
    await auth.use('web').login(userEntity.toModel() as UserModel)
  }
}
