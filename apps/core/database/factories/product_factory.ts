import factory from '@adonisjs/lucid/factories'
import Product from '#models/product.model'
import { ProductVariantFactory } from './product_variant_factory.js'
import { CategoryFactory } from './category_factory.js'
import {randomUUID} from "node:crypto";

// Product templates organized by category type for coherent data
const PRODUCT_TEMPLATES = {
  electronics: {
    smartphones: [
      { name: 'iPhone 15 Pro', brand: 'Apple' },
      { name: 'Galaxy S24 Ultra', brand: 'Samsung' },
      { name: 'Pixel 8 Pro', brand: 'Google' },
      { name: 'Xperia 1 V', brand: 'Sony' },
    ],
    laptops: [
      { name: 'MacBook Pro', brand: 'Apple' },
      { name: 'ThinkPad X1 Carbon', brand: 'Lenovo' },
      { name: 'Surface Laptop', brand: 'Microsoft' },
      { name: 'XPS 13', brand: 'Dell' },
    ],
    headphones: [
      { name: 'AirPods Pro', brand: 'Apple' },
      { name: 'WH-1000XM5', brand: 'Sony' },
      { name: 'QuietComfort 45', brand: 'Bose' },
      { name: 'Momentum 4', brand: 'Sennheiser' },
    ],
  },
  clothing: {
    shoes: [
      { name: 'Air Jordan 1', brand: 'Nike' },
      { name: 'Stan Smith', brand: 'Adidas' },
      { name: 'Chuck Taylor All Star', brand: 'Converse' },
      { name: 'Old Skool', brand: 'Vans' },
    ],
    jackets: [
      { name: 'Windrunner Jacket', brand: 'Nike' },
      { name: 'Trefoil Track Jacket', brand: 'Adidas' },
      { name: 'Fleece Hoodie', brand: 'Champion' },
      { name: 'Bomber Jacket', brand: 'Alpha Industries' },
    ],
  },
  vehicles: {
    sedans: [
      { name: '3 Series', brand: 'BMW' },
      { name: 'C-Class', brand: 'Mercedes-Benz' },
      { name: 'Camry', brand: 'Toyota' },
      { name: 'Accord', brand: 'Honda' },
    ],
    suvs: [
      { name: 'X5', brand: 'BMW' },
      { name: 'GLE', brand: 'Mercedes-Benz' },
      { name: 'RAV4', brand: 'Toyota' },
      { name: 'CR-V', brand: 'Honda' },
    ],
  },
}

function generateSlug(name: string): string {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()

  // Add random suffix to ensure uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 8)
  return `${baseSlug}-${randomSuffix}`
}

function getCoherentProductData(faker: any) {
  const categoryTypes = Object.keys(PRODUCT_TEMPLATES) as Array<keyof typeof PRODUCT_TEMPLATES>
  const selectedType = faker.helpers.arrayElement(categoryTypes)
  const subcategories = Object.keys(PRODUCT_TEMPLATES[selectedType]) as Array<
    keyof (typeof PRODUCT_TEMPLATES)[typeof selectedType]
  >
  const selectedSubcategory = faker.helpers.arrayElement(subcategories)
  const products = PRODUCT_TEMPLATES[selectedType][selectedSubcategory]
  const selectedProduct = faker.helpers.arrayElement(products)

  const productName = `${selectedProduct.brand} ${selectedProduct.name}`
  const slug = generateSlug(productName)

  const descriptions = {
    electronics: [
      'Premium technology with cutting-edge features and sleek design.',
      'Advanced performance meets elegant craftsmanship in this innovative device.',
      'Professional-grade quality with user-friendly interface and reliability.',
      'State-of-the-art engineering delivers exceptional user experience.',
    ],
    clothing: [
      'Comfortable and stylish design perfect for everyday wear.',
      'Premium materials and contemporary styling for the modern wardrobe.',
      'Classic design with modern comfort and durability.',
      'Fashion-forward style meets practical functionality.',
    ],
    vehicles: [
      'Exceptional performance with advanced safety features and comfort.',
      'Luxury meets efficiency in this premium automotive experience.',
      'Innovative design with superior handling and modern technology.',
      'Reliable performance with sophisticated engineering and style.',
    ],
  } as const

  return {
    id: randomUUID(),
    productName,
    slug,
    brand: selectedProduct.brand,
    description: faker.helpers.arrayElement(descriptions[selectedType]),
    categoryType: selectedType,
    subcategory: selectedSubcategory,
  }
}

export const ProductFactory = factory
  .define(Product, ({ faker }) => {
    const productData = getCoherentProductData(faker)

    return {
      id: faker.string.uuid(),
      name: productData.productName,
      slug: productData.slug,
      description: productData.description,
      isActive: true,
    }
  })
  .state('electronics', (model) => {
    const products = [
      ...PRODUCT_TEMPLATES.electronics.smartphones,
      ...PRODUCT_TEMPLATES.electronics.laptops,
      ...PRODUCT_TEMPLATES.electronics.headphones,
    ]
    const product = products[Math.floor(Math.random() * products.length)]
    const productName = `${product.brand} ${product.name}`

    model.name = productName
    model.slug = generateSlug(productName)
    model.description = 'Premium technology with cutting-edge features and sleek design.'
    model.isActive = true
    return model
  })
  .state('clothing', (model) => {
    const products = [...PRODUCT_TEMPLATES.clothing.shoes, ...PRODUCT_TEMPLATES.clothing.jackets]
    const product = products[Math.floor(Math.random() * products.length)]
    const productName = `${product.brand} ${product.name}`

    model.name = productName
    model.slug = generateSlug(productName)
    model.description = 'Comfortable and stylish design perfect for everyday wear.'
    model.isActive = true
    return model
  })
  .state('vehicle', (model) => {
    const products = [...PRODUCT_TEMPLATES.vehicles.sedans, ...PRODUCT_TEMPLATES.vehicles.suvs]
    const product = products[Math.floor(Math.random() * products.length)]
    const productName = `${product.brand} ${product.name}`

    model.name = productName
    model.slug = generateSlug(productName)
    model.description = 'Exceptional performance with advanced safety features and comfort.'
    model.isActive = true
    return model
  })
  .relation('variants', ProductVariantFactory)
  .relation('categories', CategoryFactory)
  .build()

// Export product templates for use in variant factory
export { PRODUCT_TEMPLATES }
