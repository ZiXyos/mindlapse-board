import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { CategoryFactory } from '#datab/ase/factories/category_factory'

export default class CategorySeeder extends BaseSeeder {
  async run() {
    // Create categories for each type to ensure we have good variety
    await CategoryFactory.apply('brand').createMany(8)
    await CategoryFactory.apply('vehicle').createMany(6)
    await CategoryFactory.apply('electronics').createMany(8)
    await CategoryFactory.apply('clothing').createMany(8)
    await CategoryFactory.apply('furniture').createMany(6)
    await CategoryFactory.apply('sports').createMany(6)

    // Create some additional random categories
    await CategoryFactory.createMany(10)
  }
}
