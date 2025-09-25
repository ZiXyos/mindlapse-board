enum Currencies {
  EUR = 'EUR',
  USD = 'USD',
  KRW = 'KRW',
  JPY = 'JPY'
}

export type Currency = keyof typeof Currencies
