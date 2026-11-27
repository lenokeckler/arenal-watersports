import { STRING } from "@/app/constants";
import type { ExtraQueryCalls } from "./models/ExtraQueryCalls.interface";
import type { ExtraQueryClient } from "./models/ExtraQueryClient.interface";
import type { ExtraQueryResult } from "./models/ExtraQueryResult.interface";

export const RESERVATION_ITEMS_TABLE = "reservation_items";

export const buildQueryClient = (
  result: ExtraQueryResult
): ExtraQueryClient => {
  const calls: ExtraQueryCalls = {
    from: STRING.Empty,
    eq: [],
  };
  const chain = {
    select: () => chain,
    order: () => chain,
    eq: (column: string, value: string) => {
      calls.eq.push([column, value]);
      return chain;
    },
    maybeSingle: () => Promise.resolve(result),
    then: (
      resolve: (queryResult: ExtraQueryResult) => void
    ) => resolve(result),
  };
  const client: ExtraQueryClient["client"] = {
    from: (table: string) => {
      calls.from = table;
      return chain;
    },
  } as never;

  return { client, calls };
};
