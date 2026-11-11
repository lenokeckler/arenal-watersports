import type { DISPATCH_SHEET_PHASE } from "../constants/DispatchSheetCopy.constants";

export type DispatchSheetPhase =
  (typeof DISPATCH_SHEET_PHASE)[keyof typeof DISPATCH_SHEET_PHASE];
