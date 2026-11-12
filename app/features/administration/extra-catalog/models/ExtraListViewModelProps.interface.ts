import type { ExtraListViewProps } from "./ExtraListViewProps.interface";

export type ExtraListViewModelProps = Pick<
  ExtraListViewProps,
  "extras" | "fetchFailed"
>;
