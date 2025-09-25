import vine from "@vinejs/vine";

const loginUserCredentialObject = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6)
})
export const loginUserCredentialSchema = vine.compile(loginUserCredentialObject)