import type { ExtraIdUpdater } from "../models/ExtraIdUpdater.type";

export const clearExtraIdWhenCurrent =
  (extraId: string): ExtraIdUpdater =>
  (current) =>
    current === extraId ? null : current;
