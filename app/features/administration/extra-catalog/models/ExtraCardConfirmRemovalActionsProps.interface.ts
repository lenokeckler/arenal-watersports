import type { ExtraCardActionsProps } from "./ExtraCardActionsProps.interface";

export type ExtraCardConfirmRemovalActionsProps = Pick<
  ExtraCardActionsProps,
  | "isActionLoading"
  | "onCancelClick"
  | "onConfirmRemovalClick"
>;
