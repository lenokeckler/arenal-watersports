import type { ExtraPendingIdsUpdater } from "./ExtraPendingIdsUpdater.type";

export type ExtraPendingIdSetter = (
  update: ExtraPendingIdsUpdater
) => void;
