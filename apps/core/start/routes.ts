/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ProductControllers = () => import('#controllers/v1/product_controllers')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const productRoutes = () => {
  router
    .group(() => {
      router.get('/', [ProductControllers, 'getProducts'])
      router.post('/', [ProductControllers, 'createProduct'])
    })
    .prefix('/products')
}

router
  .group(() => {
    productRoutes()
  })
  .prefix('/v1')
