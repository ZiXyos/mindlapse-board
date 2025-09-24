import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class ExchangeRatesService {
  private readonly API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest'
  private readonly SUPPORTED_CURRENCIES = ['EUR', 'USD', 'KRW', 'JPY'] as const

  async getRates(baseCurrency: string): Promise<Record<string, number>> {
    try {
      logger.info('fetching exchange rates', { baseCurrency })

      const response = await fetch(`${this.API_BASE_URL}/${baseCurrency}`)

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`)
      }

      const data = await response.json()

      // Filter only supported currencies and convert to numbers
      const filteredRates: Record<string, number> = {}

      this.SUPPORTED_CURRENCIES.forEach((currency) => {
        if (data.rates[currency] !== undefined) {
          filteredRates[currency] = Number(data.rates[currency])
        }
      })

      logger.info('successfully fetched exchange rates', {
        baseCurrency,
        ratesCount: Object.keys(filteredRates).length
      })

      return filteredRates
    } catch (error) {
      logger.error('failed to fetch exchange rates', { error, baseCurrency })
      throw new Error(`Failed to fetch exchange rates: ${error.message}`)
    }
  }
}
