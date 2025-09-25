import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

import UserModel from '#models/user'
import { args } from '@adonisjs/core/ace'
import { randomUUID } from 'node:crypto'

export default class RegisterAdmin extends BaseCommand {
  static commandName = 'register:admin'
  static description = ''
  static options: CommandOptions = {
    startApp: true,
  }

  @args.string({ description: 'email user', allowEmptyValue: true, required: false })
  public email?: string

  @args.string({ description: 'user password', allowEmptyValue: true, required: false })
  public password?: string

  async run() {
    this.logger.info('Hello world from "RegisterAdmin"')

    const email = this.email ? this.email : await this.prompt.ask('Enter email address')
    const password = this.password ? this.password : await this.prompt.ask('Enter password')
    const userID = randomUUID()

    await UserModel.create({
      id: userID,
      fullName: 'admin',
      email: email,
      password: password,
    })

    this.logger.success('RegisterAdmin successfully.')
  }
}
