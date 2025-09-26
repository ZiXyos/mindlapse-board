import factory from '@adonisjs/lucid/factories'
import ProductVariant from '#models/variant.model'
import type { Currency, VariantOptions, PricesJson } from '#models/variant.model'
import {randomUUID} from "node:crypto";

// Variant option templates for different product types
const VARIANT_OPTIONS = {
  electronics: {
    smartphones: {
      storage: ['64GB', '128GB', '256GB', '512GB', '1TB'],
      color: ['Black', 'White', 'Blue', 'Red', 'Gold', 'Silver', 'Purple'],
    },
    laptops: {
      ram: ['8GB', '16GB', '32GB', '64GB'],
      storage: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'],
      color: ['Space Gray', 'Silver', 'Midnight', 'Starlight'],
    },
    headphones: {
      color: ['Black', 'White', 'Silver', 'Blue', 'Red'],
      connectivity: ['Wireless', 'Wired', 'USB-C'],
    },
  },
  clothing: {
    shoes: {
      size: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
      color: ['Black', 'White', 'Red', 'Blue', 'Gray', 'Brown'],
    },
    jackets: {
      size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      color: ['Black', 'Navy', 'Gray', 'Olive', 'Brown'],
    },
  },
  vehicles: {
    sedans: {
      engine: ['2.0L Turbo', '3.0L V6', '2.5L Hybrid', '3.5L V6'],
      transmission: ['Manual', 'Automatic', 'CVT'],
      trim: ['Base', 'Sport', 'Luxury', 'Premium'],
    },
    suvs: {
      engine: ['2.4L', '3.5L V6', '2.0L Turbo', '3.0L Hybrid'],
      drivetrain: ['FWD', 'AWD', '4WD'],
      trim: ['Base', 'Sport', 'Limited', 'Premium'],
    },
  },
}

const CURRENCIES: Currency[] = ['EUR', 'USD', 'KRW', 'JPY']

function generateSKU(productName: string, options: VariantOptions): string {
  const productCode = productName
    .split(' ')
    .map((word) => word.slice(0, 2).toUpperCase())
    .join('')
    .slice(0, 6)

  const optionCode = Object.values(options)
    .map((value) => value.slice(0, 2).toUpperCase())
    .join('')
    .slice(0, 6)

  return `${productCode}-${optionCode}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')}`
}

function generatePricesJson(basePrice: number, baseCurrency: Currency): PricesJson {
  const exchangeRates = {
    EUR: { USD: 1.1, KRW: 1450, JPY: 160 },
    USD: { EUR: 0.91, KRW: 1320, JPY: 145 },
    KRW: { EUR: 0.00069, USD: 0.00076, JPY: 0.11 },
    JPY: { EUR: 0.0063, USD: 0.0069, KRW: 9.1 },
  }

  const prices: PricesJson = { [baseCurrency]: basePrice }

  CURRENCIES.forEach((currency) => {
    if (currency !== baseCurrency) {
      const rate = exchangeRates[baseCurrency][currency] || 1
      prices[currency] = Math.round(basePrice * rate * 100) / 100
    }
  })

  return prices
}

function getVariantOptionsForProduct(faker: any, productName: string): VariantOptions {
  const lowerProductName = productName.toLowerCase()

  // Determine product category from name
  let categoryOptions: Record<string, string[]> = {}

  if (lowerProductName.includes('iphone') || lowerProductName.includes('galaxy') || lowerProductName.includes('pixel')) {
    categoryOptions = VARIANT_OPTIONS.electronics.smartphones
  } else if (lowerProductName.includes('macbook') || lowerProductName.includes('thinkpad') || lowerProductName.includes('surface')) {
    categoryOptions = VARIANT_OPTIONS.electronics.laptops
  } else if (lowerProductName.includes('airpods') || lowerProductName.includes('headphones') || lowerProductName.includes('momentum')) {
    categoryOptions = VARIANT_OPTIONS.electronics.headphones
  } else if (lowerProductName.includes('jordan') || lowerProductName.includes('stan smith') || lowerProductName.includes('chuck taylor')) {
    categoryOptions = VARIANT_OPTIONS.clothing.shoes
  } else if (lowerProductName.includes('jacket') || lowerProductName.includes('hoodie') || lowerProductName.includes('bomber')) {
    categoryOptions = VARIANT_OPTIONS.clothing.jackets
  } else if (lowerProductName.includes('series') || lowerProductName.includes('class') || lowerProductName.includes('camry')) {
    categoryOptions = VARIANT_OPTIONS.vehicles.sedans
  } else if (lowerProductName.includes('x5') || lowerProductName.includes('gle') || lowerProductName.includes('rav4')) {
    categoryOptions = VARIANT_OPTIONS.vehicles.suvs
  } else {
    // Default to smartphone options
    categoryOptions = VARIANT_OPTIONS.electronics.smartphones
  }

  const options: VariantOptions = {}
  const optionKeys = Object.keys(categoryOptions)

  // Select 1-3 option types randomly
  const numOptions = faker.number.int({ min: 1, max: 3 })
  const selectedKeys = faker.helpers.arrayElements(optionKeys, numOptions)

  selectedKeys.forEach((key) => {
    options[key] = faker.helpers.arrayElement(categoryOptions[key])
  })

  return options
}

export const ProductVariantFactory = factory
  .define(ProductVariant, ({ faker }) => {
    const productName = faker.commerce.productName()
    const options = getVariantOptionsForProduct(faker, productName)
    const baseCurrency = faker.helpers.arrayElement(CURRENCIES)
    const basePriceInDollars = faker.helpers.rangeToNumber({ min: 10, max: 5000 })
    const basePriceInCents = Math.round(basePriceInDollars * 100)
    const pricesJson = generatePricesJson(basePriceInDollars, baseCurrency)

    // Generate variant name based on options
    const optionValues = Object.values(options).filter(Boolean)
    const variantName = optionValues.length > 0 ? optionValues.join(' ') : 'Standard'

    return {
      id: randomUUID(),
      sku: generateSKU(productName, options),
      name: variantName,
      options,
      position: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
      price: basePriceInCents,
      stockQuantity: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
      currency: baseCurrency,
      pricesJson,
      isDefault: true,
    }
  })
  .state('inStock', (model) => {
    model.stockQuantity = Math.floor(Math.random() * 990) + 10 // 10-1000
    return model
  })
  .state('outOfStock', (model) => {
    model.stockQuantity = 0
    return model
  })
  .state('defaultVariant', (model) => {
    model.isDefault = true
    model.position = 1
    return model
  })
  .state('electronics', (model) => {
    const optionsList = [
      { storage: '256GB', color: 'Black' },
      { ram: '16GB', storage: '512GB SSD' },
      { color: 'White', connectivity: 'Wireless' },
    ]
    const options = optionsList[Math.floor(Math.random() * optionsList.length)]
    const basePriceInDollars = Math.random() * 2900 + 100 // 100-3000
    const basePriceInCents = Math.round(basePriceInDollars * 100)

    model.options = options
    model.price = basePriceInCents
    model.pricesJson = generatePricesJson(basePriceInDollars, 'EUR')
    model.currency = 'EUR'
    return model
  })
  .state('clothing', (model) => {
    const optionsList = [
      { size: 'M', color: 'Black' },
      { size: '9', color: 'White' },
      { size: 'L', color: 'Navy' },
    ]
    const options = optionsList[Math.floor(Math.random() * optionsList.length)]
    const basePriceInDollars = Math.random() * 275 + 25 // 25-300
    const basePriceInCents = Math.round(basePriceInDollars * 100)

    model.options = options
    model.price = basePriceInCents
    model.pricesJson = generatePricesJson(basePriceInDollars, 'EUR')
    model.currency = 'EUR'
    return model
  })
  .state('vehicle', (model) => {
    const optionsList = [
      { engine: '2.0L Turbo', transmission: 'Automatic', trim: 'Sport' },
      { engine: '3.5L V6', drivetrain: 'AWD', trim: 'Premium' },
    ]
    const options = optionsList[Math.floor(Math.random() * optionsList.length)]
    const basePriceInDollars = Math.random() * 60000 + 20000 // 20000-80000
    const basePriceInCents = Math.round(basePriceInDollars * 100)

    model.options = options
    model.price = basePriceInCents
    model.pricesJson = generatePricesJson(basePriceInDollars, 'EUR')
    model.currency = 'EUR'
    return model
  })
  .build()
