import type { ExtraOccupancySectionProps } from "./ExtraOccupancySectionProps.type";

export type ExtraOccupancyKindChoicesProps = Pick<
  ExtraOccupancySectionProps,
  | "isOccupancyEnabled"
  | "isOccupancyDisabled"
  | "onOccupancySelect"
>;
