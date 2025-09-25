import { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  constructor() {}

  async getUser(ctx: HttpContext) {
    return 'Hello world'
  }

  async createUser(ctx: HttpContext) {
    return 'new user'
  }

}
