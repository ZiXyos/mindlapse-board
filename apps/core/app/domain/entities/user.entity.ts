import type { EmailType } from '@mindboard/shared'
import UserModel from '#models/user'
import { AuthentificationCommand } from '#commands/authentification.command'

export default class UserEntity {
  constructor(
    protected id: number,
    protected email: string
  ) {}

  static create(params: { id: number; email: EmailType }): UserEntity {
    return new UserEntity(params.id, params.email)
  }

  public from(userModel: UserModel): UserEntity {
    return new UserEntity(userModel.id, userModel.email)
  }

  public toModel(): Partial<UserModel> {
    return {
      id: this.id,
      email: this.email,
    } as UserModel
  }

  public async validate({ params }: AuthentificationCommand): Promise<UserEntity | null> {
    const validatedUser = await UserModel.verifyCredentials(params.email, params.password)
    if (!validatedUser) {
      return null
    }

    return this.from(validatedUser)
  }
}
