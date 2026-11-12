import type { Nullable } from "@/app/types";

export type ExtraIdUpdater = (
  current: Nullable<string>
) => Nullable<string>;
