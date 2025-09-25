import type { EmailType, PasswordType } from '@mindboard/shared'

type AuthentificationCommandType = {
  email: EmailType
  password: PasswordType
}

export class AuthentificationCommand {
  constructor(public readonly params: AuthentificationCommandType) {}
}
