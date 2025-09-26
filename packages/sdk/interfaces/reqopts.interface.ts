import { QueryParams } from "../types/client.type"

export interface RequestOptions {
  headers: Record<string, string>;
  body: Record<string, unknown>;
  queryParams: QueryParams;
  validateStatus: (status: number) => boolean
};
