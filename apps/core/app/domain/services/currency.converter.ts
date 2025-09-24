import { Currency } from '@mindboard/shared'

import { inject } from '@adonisjs/core'

inject()
export default class ConvertCurrency {
  execute(currency: Currency = 'EUR', price: number, exchangeRate: number): number {
    return Math.round((price / 100) * exchangeRate)
  }
}
