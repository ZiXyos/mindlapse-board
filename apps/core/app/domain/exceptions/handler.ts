import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://mindboard.local:5173',
      'http://mindboard.local',
      'https://mindboard.local',
      'http://api.mindboard.local',
      'https://api.mindboard.local'
    ]

    const origin = ctx.request.header('origin')
    if (origin && allowedOrigins.includes(origin)) {
      ctx.response.header('Access-Control-Allow-Origin', origin)
      ctx.response.header('Access-Control-Allow-Credentials', 'true')
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
