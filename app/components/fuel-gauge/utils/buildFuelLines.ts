import { FUEL_GAUGE_LINE } from "../constants/FuelGauge.constants";

export const buildFuelLines = (max: number): number[] =>
  Array.from(
    { length: max },
    (_, index) => index + FUEL_GAUGE_LINE.FIRST
  );
