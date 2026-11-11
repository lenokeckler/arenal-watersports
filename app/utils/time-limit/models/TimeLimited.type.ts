import type { TIME_LIMIT } from "@/app/constants";

export type TimeLimited<Value> =
  Value | typeof TIME_LIMIT.REACHED;
