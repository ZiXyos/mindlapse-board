import { HTTPClient } from "./http-client";
import { ProductRes } from "./res/products.res";
import { AuthRes } from "./res/auth.res";
import { UserRes } from "./res/user.res";

export class Client {
  private readonly httpClient: HTTPClient
  public readonly products: ProductRes
  public readonly auth: AuthRes
  public readonly users: UserRes

  constructor(baseURL: string = 'http://localhost:3333') {
    try {
      this.httpClient = new HTTPClient(baseURL)
      this.products = new ProductRes(this.httpClient);
      this.auth = new AuthRes(this.httpClient);
      this.users = new UserRes(this.httpClient);
    } catch(err) {
      throw new Error('Error while initializing SDK client')
    }
  }
}
