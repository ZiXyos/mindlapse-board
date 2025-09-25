import vine from "@vinejs/vine";
import {Infer} from "@vinejs/vine/types";
import { productFilterObject } from "@shared/domain";
import { productSortObject } from "@shared/domain";

export const productQuerySchema = vine.compile(
    vine.object({
        filters: productFilterObject.optional(),
        sort: productSortObject.optional(),
        page: vine.number().min(1).optional(),
        limit: vine.number().min(1).max(100).optional(),
    })
);

export type ProductQueryRequest = Infer<typeof productQuerySchema>;