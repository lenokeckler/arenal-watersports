import type { ExtraIdUpdater } from "./ExtraIdUpdater.type";

export type ExtraPendingIdSetter = (
  update: ExtraIdUpdater
) => void;
