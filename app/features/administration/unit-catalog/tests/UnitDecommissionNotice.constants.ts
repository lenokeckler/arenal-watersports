import type { Unit } from "../models/Unit.interface";
import { DEFAULT_UNIT } from "./Unit.constants";

export const FAKE_DECOMMISSION_REASON = "Casco partido";
export const DECOMMISSIONED_AT_UTC = "2026-10-29T03:00:00Z";
export const EXPECTED_DATE_TEXT = "28 de octubre de 2026";

export const DECOMMISSIONED_UNIT: Unit = {
  ...DEFAULT_UNIT,
  decommissionedAt: DECOMMISSIONED_AT_UTC,
  decommissionReason: FAKE_DECOMMISSION_REASON,
};
