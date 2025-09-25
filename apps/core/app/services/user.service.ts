import {inject} from "@adonisjs/core";

@inject()
export default class UserService {
  constructor() {}

  async getUser(): Promise<void> {}
}
