import type { NullableRef } from "@/app/types";
import {
  FUEL_GAUGE_LINE,
  FUEL_GAUGE_TONE,
} from "../constants/FuelGauge.constants";
import type { FuelGaugeTone } from "../models/FuelGaugeTone.type";

export const getFuelGaugeTone = (
  level: NullableRef<number>,
  lowLines: number
): FuelGaugeTone => {
  if (level === null) {
    return FUEL_GAUGE_TONE.OK;
  }

  if (level === FUEL_GAUGE_LINE.EMPTY) {
    return FUEL_GAUGE_TONE.EMPTY;
  }

  return level <= lowLines
    ? FUEL_GAUGE_TONE.LOW
    : FUEL_GAUGE_TONE.OK;
};
