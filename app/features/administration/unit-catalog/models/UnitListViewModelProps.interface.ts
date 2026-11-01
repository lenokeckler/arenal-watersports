import type { UnitListViewProps } from "./UnitListViewProps.interface";

export type UnitListViewModelProps = Pick<
  UnitListViewProps,
  "category" | "fetchFailed" | "units"
>;
