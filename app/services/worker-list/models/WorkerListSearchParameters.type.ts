import type { NullableUndefined } from "@/app/types";

export type WorkerListSearchParameters = Record<
  string,
  NullableUndefined<string | string[]>
>;
