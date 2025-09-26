import {Infer} from "@vinejs/vine/types";
import {loginUserCredentialSchema} from "../validator/credential.validator";

export type CredentialDTO = Infer<typeof loginUserCredentialSchema>