/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ProductControllers = () => import('#controllers/v1/product.controllers')

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

      router.post('/query', [ProductControllers, 'queryProducts'])

      router.get('/:id', [ProductControllers, 'getProductByID'])
      router.delete('/:id', [ProductControllers, 'deleteProduct'])
      router.put('/:id', [ProductControllers, 'replaceProduct'])
      router.patch('/:id', [ProductControllers, 'updateProduct'])
    })
    .prefix('/products')
}

router
  .group(() => {
    productRoutes()
  })
  .prefix('/v1')
