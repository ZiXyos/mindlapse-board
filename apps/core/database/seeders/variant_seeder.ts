import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ProductFactory } from '#database/factories/product_factory'
import { ProductVariantFactory } from '#database/factories/product_variant_factory'
import { CategoryFactory } from '#database/factories/category_factory'
import ProductModel from '#models/product.model'
import Category from '#models/category.model'

export default class ProductVariantSeeder extends BaseSeeder {
  async run() {
    // First ensure we have categories
    const categoryCount = await Category.query().count('* as total')
    if (categoryCount[0].$extras.total === 0) {
      console.log('No categories found, creating some...')
      await CategoryFactory.apply('electronics').createMany(5)
      await CategoryFactory.apply('clothing').createMany(5)
      await CategoryFactory.apply('brand').createMany(5)
    }

    // Create electronics products with variants
    const electronicsProducts = await ProductFactory.apply('electronics').createMany(8)
    for (const product of electronicsProducts) {
      // Create 2-5 variants per product
      const variantCount = Math.floor(Math.random() * 4) + 2

      for (let i = 0; i < variantCount; i++) {
        await ProductVariantFactory.apply('electronics').merge({
          productId: product.id,
          position: i + 1,
          isDefault: i === 0
        }).create()
      }

      // Assign electronics categories to product
      const electronicsCategories = await Category.query()
        .whereIn('name', ['Smartphones', 'Laptops', 'Headphones', 'Smart TVs'])
        .limit(2)
      if (electronicsCategories.length > 0) {
        await product.related('categories').attach(electronicsCategories.map((c) => c.id))
      }
    }

    // Create clothing products with variants
    const clothingProducts = await ProductFactory.apply('clothing').createMany(6)
    for (const product of clothingProducts) {
      const variantCount = Math.floor(Math.random() * 6) + 3 // 3-8 variants (sizes/colors)

      for (let i = 0; i < variantCount; i++) {
        await ProductVariantFactory.apply('clothing').merge({
          productId: product.id,
          position: i + 1,
          isDefault: i === 0
        }).create()
      }

      // Assign clothing categories
      const clothingCategories = await Category.query()
        .whereIn('name', ['Shoes', 'Jackets', 'T-Shirts', 'Sportswear'])
        .limit(2)
      if (clothingCategories.length > 0) {
        await product.related('categories').attach(clothingCategories.map((c) => c.id))
      }
    }

    // Create vehicle products with variants
    const vehicleProducts = await ProductFactory.apply('vehicle').createMany(4)
    for (const product of vehicleProducts) {
      const variantCount = Math.floor(Math.random() * 3) + 2 // 2-4 variants (trims/engines)

      for (let i = 0; i < variantCount; i++) {
        await ProductVariantFactory.apply('vehicle').merge({
          productId: product.id,
          position: i + 1,
          isDefault: i === 0
        }).create()
      }

      // Assign vehicle categories
      const vehicleCategories = await Category.query()
        .whereIn('name', ['Sedan', 'SUV', 'Electric Vehicle', 'Hybrid'])
        .limit(2)
      if (vehicleCategories.length > 0) {
        await product.related('categories').attach(vehicleCategories.map((c) => c.id))
      }
    }

    // Create some mixed products with random categories
    const mixedProducts = await ProductFactory.createMany(10)
    for (const product of mixedProducts) {
      // Create 1-3 variants per mixed product
      const variantCount = Math.floor(Math.random() * 3) + 1

      for (let i = 0; i < variantCount; i++) {
        await ProductVariantFactory.merge({
          productId: product.id,
          position: i + 1,
          isDefault: i === 0
        }).create()
      }

      // Assign random categories
      const randomCategories = await Category.query().orderByRaw('RANDOM()').limit(3)
      if (randomCategories.length > 0) {
        await product.related('categories').attach(randomCategories.map((c) => c.id))
      }
    }

    console.log('✅ Created products with variants and category relationships')
    console.log(
      `📦 Total products: ${await ProductModel.query()
        .count('* as total')
        .then((r) => r[0].$extras.total)}`
    )
    console.log(
      `🔧 Total variants: ${await ProductModel.query()
        .withCount('variants')
        .then((products) => products.reduce((sum, p) => sum + p.$extras.variants_count, 0))}`
    )
  }
}
