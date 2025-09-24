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

  async handle(baseCurrency: string, price: Array<number>): Promise<Record<string, number>> {
    logger.info('converting currency from baseCurrency', baseCurrency)

    let currencyRates = await this.exchangeRatesService.getRates(baseCurrency)
    return Object.fromEntries(
      Object.entries(currencyRates).flatMap(([currency, rate]) =>
        price.map((p) => [currency, this.currencyConverter.execute(currency, p, rate)])
      )
    )
  }
}
