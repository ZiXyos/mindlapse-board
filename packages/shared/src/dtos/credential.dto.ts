import {Infer} from "@vinejs/vine/types";
import {loginUserCredentialSchema} from "@shared/validator/credential.validator";

export type CredentialDTO = Infer<typeof loginUserCredentialSchema>