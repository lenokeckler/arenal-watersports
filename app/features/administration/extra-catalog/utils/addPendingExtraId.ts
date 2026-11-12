import type { ExtraPendingIdsUpdater } from "../models/ExtraPendingIdsUpdater.type";

export const addPendingExtraId =
  (extraId: string): ExtraPendingIdsUpdater =>
  (current) =>
    current.includes(extraId)
      ? current
      : [...current, extraId];
