import type { CustomComboUnitSelectorProps } from "./CustomComboUnitSelectorProps.interface";

export interface CustomComboUnitAvailabilitySelectorProps extends Pick<
  CustomComboUnitSelectorProps,
  | "categoryId"
  | "categoryName"
  | "selectedUnitId"
  | "onChange"
> {
  date: string;
  durationHours: number;
  time: string;
}
