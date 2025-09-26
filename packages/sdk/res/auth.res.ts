import { HTTPClient } from "../http-client";
import { authRoutes } from '../api-routes'
import type { LoginCredentials, AuthResponse } from '@mindboard/shared'

export class AuthRes {
  constructor(private readonly client: HTTPClient) {}

  public async login(credentials: LoginCredentials) {
    return await this.client.req<{ data: AuthResponse }>(
      authRoutes.login.method,
      authRoutes.login.path,
      { body: credentials }
    )
  }

  public async logout() {
    return await this.client.req<{ data: { message: string } }>(
      authRoutes.logout.method,
      authRoutes.logout.path
    )
  }
}