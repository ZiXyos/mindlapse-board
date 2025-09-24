enum Currencies {
  EUR,
  USD,
  KRW,
  JPY
}

export type Currency = keyof typeof Currencies
