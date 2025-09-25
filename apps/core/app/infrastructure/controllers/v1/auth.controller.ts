import { HttpContext } from '@adonisjs/core/http'
import AuthAdapter from "#adapters/auth.adapter";

import { HTTPStatusServerError } from '@mindboard/shared'
import {inject} from "@adonisjs/core";

@inject()
export default class AuthController {
  constructor(protected authAdapter: AuthAdapter) {}

  async login(ctx: HttpContext) {
    try {
      const res = await this.authAdapter.handleLogin(ctx)
      ctx.response.status(res.code).send(res.data)
    } catch (err) {
      ctx.response.status(HTTPStatusServerError).send(err.message)
    }
  }

  async logout(ctx: HttpContext) {
    ctx.response.status(200).send({})
  }
}
