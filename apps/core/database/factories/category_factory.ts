import factory from '@adonisjs/lucid/factories'
import Category from '#models/category.model'
import {randomUUID} from "node:crypto";

// Predefined coherent categories organized by type
const CATEGORIES = {
  brand: [
    'Nike',
    'Adidas',
    'Apple',
    'Samsung',
    'Sony',
    'BMW',
    'Mercedes-Benz',
    'Toyota',
    'Volkswagen',
    'Louis Vuitton',
    'Gucci',
    'Chanel',
    'Rolex',
  ],
  vehicle: [
    'Sedan',
    'SUV',
    'Hatchback',
    'Coupe',
    'Convertible',
    'Truck',
    'Van',
    'Motorcycle',
    'Electric Vehicle',
    'Hybrid',
  ],
  electronics: [
    'Smartphones',
    'Laptops',
    'Tablets',
    'Smart TVs',
    'Gaming Consoles',
    'Headphones',
    'Cameras',
    'Smart Watches',
    'Home Audio',
    'Accessories',
  ],
  clothing: [
    'T-Shirts',
    'Jeans',
    'Dresses',
    'Shoes',
    'Jackets',
    'Accessories',
    'Sportswear',
    'Formal Wear',
    'Underwear',
    'Outerwear',
  ],
  furniture: [
    'Sofas',
    'Chairs',
    'Tables',
    'Beds',
    'Storage',
    'Lighting',
    'Desks',
    'Bookcases',
    'Wardrobes',
    'Dining Sets',
  ],
  sports: [
    'Running',
    'Football',
    'Basketball',
    'Tennis',
    'Golf',
    'Swimming',
    'Cycling',
    'Fitness',
    'Outdoor',
    'Team Sports',
  ],
}

const ALL_CATEGORIES = Object.values(CATEGORIES).flat()

export const CategoryFactory = factory
  .define(Category, ({ faker }) => {
    const categoryName = faker.helpers.arrayElement(ALL_CATEGORIES)
    return {
      id: randomUUID(),
      name: categoryName,
    }
  })
  .state('brand', (model) => {
    model.name = CATEGORIES.brand[Math.floor(Math.random() * CATEGORIES.brand.length)]
    return model
  })
  .state('vehicle', (model) => {
    model.name = CATEGORIES.vehicle[Math.floor(Math.random() * CATEGORIES.vehicle.length)]
    return model
  })
  .state('electronics', (model) => {
    model.name = CATEGORIES.electronics[Math.floor(Math.random() * CATEGORIES.electronics.length)]
    return model
  })
  .state('clothing', (model) => {
    model.name = CATEGORIES.clothing[Math.floor(Math.random() * CATEGORIES.clothing.length)]
    return model
  })
  .state('furniture', (model) => {
    model.name = CATEGORIES.furniture[Math.floor(Math.random() * CATEGORIES.furniture.length)]
    return model
  })
  .state('sports', (model) => {
    model.name = CATEGORIES.sports[Math.floor(Math.random() * CATEGORIES.sports.length)]
    return model
  })
  .build()

// Export category constants for use in other factories
export { CATEGORIES }
