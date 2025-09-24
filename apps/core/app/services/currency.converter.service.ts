import ConvertCurrency from '#services/currency.converter'
import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import ExchangeRatesService from '#application/exchange.rates.service'

@inject()
export default class CurrencyConverterService {
  constructor(
    protected currencyConverter: ConvertCurrency,
    protected exchangeRatesService: ExchangeRatesService
  ) {}

  async handle(
    baseCurrency: string,
    basePrice: number,
    existingPricesJson: Record<string, number> = {}
  ): Promise<Record<string, number>> {
    logger.info('converting currency from baseCurrency', { baseCurrency, basePrice })

    const currencyRates = await this.exchangeRatesService.getRates(baseCurrency)
    const result: Record<string, number> = { ...existingPricesJson }

    Object.entries(currencyRates).forEach(([currency, rate]) => {
      if (currency !== baseCurrency && !result[currency]) {
        result[currency] = this.currencyConverter.execute(baseCurrency, basePrice, rate)
      }
    })

    logger.info('currency conversion completed', {
      baseCurrency,
      convertedCurrencies: Object.keys(result).length,
    })

    return result
  }
}
