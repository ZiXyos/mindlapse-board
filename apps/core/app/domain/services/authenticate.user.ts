import { inject } from '@adonisjs/core'
import { AuthentificationCommand } from '#commands/authentification.command'
import UserEntity from '#entities/user.entity'

@inject()
export default class UserValidation {
  async execute({ params }: AuthentificationCommand): Promise<UserEntity | null> {
    const userPartialEntity = UserEntity.create({ id: 0, email: params.email })
    return await userPartialEntity.validate({ params })
  }
}
