import { FUEL_GAUGE_TIER } from "../constants/FuelGauge.constants";
import type { FuelGaugeTier } from "../models/FuelGaugeTier.type";

export const FUEL_GAUGE_WRAPPER_CLASS =
  "flex flex-col gap-1";

export const FUEL_GAUGE_LINES_CLASS = "flex gap-1";

export const FUEL_GAUGE_READOUT_CLASS =
  "text-label-md font-semibold text-on-surface";

const FUEL_LINE_BASE_CLASS =
  "flex-1 rounded-sm transition-colors";

const FUEL_LINE_DISPLAY_CLASS = `${FUEL_LINE_BASE_CLASS} h-3`;

const FUEL_LINE_BUTTON_CLASS = `${FUEL_LINE_BASE_CLASS} h-11 border border-outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`;

const FUEL_LINE_EMPTY_CLASS = "bg-surface-container-high";

const FUEL_LINE_FILL_CLASS: Record<FuelGaugeTier, string> =
  {
    [FUEL_GAUGE_TIER.HIGH]: "bg-primary",
    [FUEL_GAUGE_TIER.LOW]: "bg-error",
    [FUEL_GAUGE_TIER.MEDIUM]: "bg-tertiary",
  };

export const FUEL_PRESETS_CLASS = "grid grid-cols-4 gap-2";

export const FUEL_PRESET_BUTTON_CLASS = "min-h-12 px-0";

interface FuelLineClassInput {
  isFilled: boolean;
  isInteractive: boolean;
  tier: FuelGaugeTier | null;
}

export const resolveFuelLineClassName = ({
  isFilled,
  isInteractive,
  tier,
}: FuelLineClassInput): string => {
  const shapeClass = isInteractive
    ? FUEL_LINE_BUTTON_CLASS
    : FUEL_LINE_DISPLAY_CLASS;
  const colorClass =
    isFilled && tier !== null
      ? FUEL_LINE_FILL_CLASS[tier]
      : FUEL_LINE_EMPTY_CLASS;

  return `${shapeClass} ${colorClass}`;
};
