import { STRING } from "@/app/constants";
import type { DamageDraftHandlers } from "../models/DamageDraftHandlers.type";
import type { DamageDraftUpdate } from "../models/DamageDraftUpdate.type";
import type { DamageReportDraft } from "../models/DamageReportDraft.interface";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";
import { resolveDefaultState } from "./resolveDefaultState";

export const buildDraftHandlers = (
  update: DamageDraftUpdate,
  units: DamageReportUnit[]
): DamageDraftHandlers => ({
  handleCauseChange: (value) =>
    update({ cause: value as DamageReportDraft["cause"] }),
  handleDescriptionChange: (event) =>
    update({ description: event.target.value }),
  handleHitsChange: (value) => update({ hits: value }),
  handleStateChange: (value) =>
    update({ state: value as DamageReportDraft["state"] }),
  handleTripChange: (event) =>
    update({ reservationId: event.target.value }),
  handleUnitChange: (event) => {
    const unitId = event.target.value;
    update({
      reservationId: STRING.Empty,
      state: resolveDefaultState(
        units.find((unit) => unit.id === unitId)
      ),
      unitId,
    });
  },
});
