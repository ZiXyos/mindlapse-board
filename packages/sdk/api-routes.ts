import { METHOD } from "./constant";

export type API_ROUTES =
  | '/products'
  | '/products/:id'
  | '/products/query'
  | '/auth/login'
  | '/auth/logout'
  | '/users/:id'

type RouteParam = string | number;
type RouteParams = Record<string, RouteParam>;
type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & ExtractRouteParams<Rest>
  : T extends `${infer _Start}:${infer Param}`
  ? { [K in Param]: string }
  : {};

const routeBuilder = <
  TPath extends API_ROUTES,
  TParams extends RouteParams = ExtractRouteParams<TPath>,
>(path: TPath, method: METHOD) => ({
  path,
  method,
  createPath: (params: TParams) => (
    path.replace(/:([^/]+)/g, (_, param) => String(params[param]))
  )
})

export const productsRoutes = {
  base: routeBuilder('/products', 'GET'),
  create: routeBuilder('/products', 'POST'),
  byID: routeBuilder('/products/:id', 'GET'),
  update: routeBuilder('/products/:id', 'PUT'),
  replace: routeBuilder('/products/:id', 'PATCH'),
  delete: routeBuilder('/products/:id', 'DELETE'),
  query: routeBuilder('/products/query', 'POST')
}

export const authRoutes = {
  login: routeBuilder('/auth/login', 'POST'),
  logout: routeBuilder('/auth/logout', 'POST'),
}

export const userRoutes = {
  byID: routeBuilder('/users/:id', 'GET'),
  create: routeBuilder('/users', 'POST'),
  update: routeBuilder('/users/:id', 'PUT'),
}
