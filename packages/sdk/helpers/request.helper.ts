import type { ApiResponse } from "@mindboard/shared"
import { METHOD } from "../constant"
import { RequestOptions } from "../interfaces"

export const request = async<T>(
  method: METHOD,
  url: URL,
  opts: Partial<RequestOptions> = {},
): Promise<ApiResponse> => {
    const {
      body,
      headers,
      validateStatus  =  ((status) => status >= 200 && status < 300),
    } = opts

    const bodyAsJsonString = !body || Object.entries(body).length === 0
      ? undefined
      : JSON.stringify(body)

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: bodyAsJsonString,
      credentials: 'include'
    })

    if (!validateStatus(res.status)) {
      return {
        success: false,
        code: res.status,
        message: 'request failed'
      }
    }

    const data = await res.json() as T
    return {
      success: true,
      data: data,
      code: res.status
    }
  } catch(err) {
    console.error(err)
    throw err
  }
}
