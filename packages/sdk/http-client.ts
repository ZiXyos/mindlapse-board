import { RequestOptions } from './interfaces';
import {
  version as PACKAGE_VERSION, name as PACKAGE_NAME
} from './package.json'
import type { ApiResponse } from '@mindboard/shared'
import { METHOD, API_VERSION } from './constant';
import { request } from './helpers';

export class HTTPClient {
  constructor(
    readonly baseURL: string,
    readonly apiVersion: API_VERSION = 'v1',
    readonly userAgent: string = `${PACKAGE_NAME}-${PACKAGE_VERSION}`
  ) {}

  public async req<T>(
    method: METHOD,
    path: string,
    option: Partial<RequestOptions> = {}
  ): Promise<ApiResponse<T>> {
    const requestOptionBase = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }

    option.headers = { ...requestOptionBase.headers };

    const url = new URL(`${this.apiVersion}${path}`, this.baseURL );
    if(option.queryParams) {
      for (const [key, val] of Object.entries(option.queryParams)) {
        if (val !== undefined) {
          if (Array.isArray(val)) {
            val.forEach(v => url.searchParams.append(key, String(v)))
          } else {
            url.searchParams.append(key, String(val))
          }
        }
      }
    }
    const response = await request<T>(method, url, option) as ApiResponse;

    return response
  }

}
