import { HTTPClient } from "../http-client";
import { userRoutes } from '../api-routes'
import type { User, CreateUserPayload, UpdateUserPayload } from '@mindboard/shared'

export class UserRes {
  constructor(private readonly client: HTTPClient) {}

  public async getUser(id: string) {
    const path = userRoutes.byID.createPath({ id })
    return await this.client.req<{ data: User }>(
      userRoutes.byID.method,
      path
    )
  }

  public async createUser(payload: CreateUserPayload) {
    return await this.client.req<{ data: User }>(
      userRoutes.create.method,
      userRoutes.create.path,
      { body: payload }
    )
  }

  public async updateUser(id: string, payload: UpdateUserPayload) {
    const path = userRoutes.update.createPath({ id })
    return await this.client.req<{ data: User }>(
      userRoutes.update.method,
      path,
      { body: payload }
    )
  }
}