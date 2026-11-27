import { CHART_SCALE } from "./constants/ChartScale.constants";

export const resolveBarShare = (
  value: number,
  highest: number
): string =>
  `${highest > 0 ? (value / highest) * CHART_SCALE.FULL_SHARE : 0}%`;
