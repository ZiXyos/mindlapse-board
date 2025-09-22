import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('users', (table) => {
      table.uuid('id').primary()
      table.string('email', 254).notNullable().unique()
      table.string('password_hash').notNullable()
      table.string('full_name').nullable()
      table.enu('role', ['ADMIN', 'USER']).defaultTo('ADMIN')
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('products', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('description')
      table.boolean('is_active').defaultTo(true)
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('categories', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.createTable('product_categories', (table) => {
      table.uuid('product_id').notNullable()
      table.uuid('category_id').notNullable()
      table.primary(['product_id', 'category_id'])
      
      table.timestamp('created_at').notNullable()
    })

    this.schema.createTable('product_variants', (table) => {
      table.uuid('id').primary()
      table.uuid('product_id').notNullable()
      table.string('sku').notNullable().unique()
      table.string('name').notNullable()
      
      table.jsonb('options').notNullable()
      table.integer('position').defaultTo(0)
      
      table.integer('price').notNullable()
      table.integer('stock_quantity').defaultTo(0)
      table.enu('currency', ['EUR', 'USD', 'KRW', 'JPY']).defaultTo('EUR')
      table.jsonb('prices_json').defaultTo('{}')
      
      table.boolean('is_default').defaultTo(false)
      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.alterTable('product_categories', (table) => {
      table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE')
      table.index(['product_id'])
      table.index(['category_id'])
    })

    this.schema.alterTable('product_variants', (table) => {
      table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.index(['product_id', 'position'])
      table.index('sku')
    })

    this.schema.alterTable('products', (table) => {
      table.index('name')
      table.index('slug')
      table.index('is_active')
    })

    this.schema.alterTable('users', (table) => {
      table.index('email')
    })
  }

  async down() {
    this.schema.dropTable('product_variants')
    this.schema.dropTable('product_categories')
    this.schema.dropTable('categories')
    this.schema.dropTable('products')
    this.schema.dropTable('users')
  }
}
