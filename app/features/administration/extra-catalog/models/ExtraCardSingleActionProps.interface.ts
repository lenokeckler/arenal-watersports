import type { ExtraCardActionsProps } from "./ExtraCardActionsProps.interface";

export type ExtraCardSingleActionProps = Pick<
  ExtraCardActionsProps,
  | "actionState"
  | "isActionLoading"
  | "onReactivateClick"
  | "onRemoveClick"
>;
