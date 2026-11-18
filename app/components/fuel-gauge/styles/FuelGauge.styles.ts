import { FUEL_GAUGE_TONE } from "../constants/FuelGauge.constants";
import type { FuelGaugeTone } from "../models/FuelGaugeTone.type";

export const FUEL_GAUGE_WRAPPER_CLASS =
  "flex flex-col gap-1";

export const FUEL_GAUGE_LINES_CLASS = "flex gap-1.5";

const FUEL_LINE_BASE_CLASS =
  "flex-1 rounded-sm border transition-colors";

const FUEL_LINE_DISPLAY_CLASS = `${FUEL_LINE_BASE_CLASS} h-3`;

const FUEL_LINE_BUTTON_CLASS = `${FUEL_LINE_BASE_CLASS} h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`;

const FUEL_LINE_UNFILLED_DISPLAY_CLASS =
  "border-transparent bg-surface-container-high";

const FUEL_LINE_UNFILLED_BUTTON_CLASS =
  "border-outline bg-surface-container-high";

const FUEL_LINE_EMPTY_TONE_CLASS =
  "border-error bg-transparent";

const FUEL_LINE_FILL_CLASS: Record<
  Exclude<FuelGaugeTone, typeof FUEL_GAUGE_TONE.EMPTY>,
  string
> = {
  [FUEL_GAUGE_TONE.LOW]: "border-warning bg-warning",
  [FUEL_GAUGE_TONE.OK]: "border-primary bg-primary",
};

interface FuelLineClassInput {
  isFilled: boolean;
  isInteractive: boolean;
  tone: FuelGaugeTone;
}

const resolveColorClassName = ({
  isFilled,
  isInteractive,
  tone,
}: FuelLineClassInput): string => {
  if (tone === FUEL_GAUGE_TONE.EMPTY) {
    return FUEL_LINE_EMPTY_TONE_CLASS;
  }

  if (isFilled) {
    return FUEL_LINE_FILL_CLASS[tone];
  }

  return isInteractive
    ? FUEL_LINE_UNFILLED_BUTTON_CLASS
    : FUEL_LINE_UNFILLED_DISPLAY_CLASS;
};

export const resolveFuelLineClassName = (
  input: FuelLineClassInput
): string => {
  const shapeClass = input.isInteractive
    ? FUEL_LINE_BUTTON_CLASS
    : FUEL_LINE_DISPLAY_CLASS;

  return `${shapeClass} ${resolveColorClassName(input)}`;
};

export const FUEL_PRESET_BUTTON_CLASS = "min-h-12 px-0";

export const FUEL_PRESETS_CLASS = "grid grid-cols-4 gap-2";
