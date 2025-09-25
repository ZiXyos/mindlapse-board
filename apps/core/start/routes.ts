/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
const AuthController = () => import('#controllers/v1/auth.controller')

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
      router.delete('/:id', [ProductControllers])
      router.put('/:id', ProductControllers)
      router.patch('/:id', [ProductControllers])
    })
    .prefix('/products')
}

const userRoutes = () => {
  router
    .group(() => {
      router.get('/:id', function (ctx: HttpContext) {
        ctx.response.status(200).send({ data: { username: 'admin' } })
      })
    })
    .prefix('/user')
}

const authRoutes = () => {
  router
    .group(() => {
      router.post('/login', [AuthController, 'login'])
      router.post('/logout', [AuthController, 'logout'])
    })
    .prefix('/auth')
}

router
  .group(() => {
    productRoutes()
    authRoutes()
    userRoutes()
  })
  .prefix('/v1')
