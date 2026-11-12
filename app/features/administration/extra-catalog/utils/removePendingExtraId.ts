import type { ExtraPendingIdsUpdater } from "../models/ExtraPendingIdsUpdater.type";

export const removePendingExtraId =
  (extraId: string): ExtraPendingIdsUpdater =>
  (current) =>
    current.filter((pendingId) => pendingId !== extraId);
