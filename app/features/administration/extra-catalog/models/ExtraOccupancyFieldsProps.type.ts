import type { ExtraOccupancySectionProps } from "./ExtraOccupancySectionProps.type";

export type ExtraOccupancyFieldsProps = Pick<
  ExtraOccupancySectionProps,
  | "values"
  | "errors"
  | "isOccupancyDisabled"
  | "hasOccupiableCategories"
  | "occupancyCategoryOptions"
  | "onOccupiesCategoryChange"
  | "onOccupiesQuantityChange"
  | "onOccupiesQuantityStep"
>;
