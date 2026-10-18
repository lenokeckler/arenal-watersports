import type { TIME_LIMIT_REACHED } from "@/app/constants";

export type TimeLimited<Value> =
  Value | typeof TIME_LIMIT_REACHED;
