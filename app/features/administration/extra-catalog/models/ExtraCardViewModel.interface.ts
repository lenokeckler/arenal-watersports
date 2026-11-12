import type { ExtraCardActionsProps } from "./ExtraCardActionsProps.interface";
import type { ExtraStatus } from "./ExtraStatus.type";

export interface ExtraCardViewModel extends ExtraCardActionsProps {
  id: string;
  name: string;
  status: ExtraStatus;
}
