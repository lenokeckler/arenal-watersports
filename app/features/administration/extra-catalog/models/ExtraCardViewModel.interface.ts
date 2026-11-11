import type { ExtraCardActionsProps } from "./ExtraCardActionsProps.interface";
import type { ExtraCardPricesProps } from "./ExtraCardPricesProps.interface";
import type { ExtraStatus } from "./ExtraStatus.type";

export interface ExtraCardViewModel
  extends ExtraCardActionsProps, ExtraCardPricesProps {
  id: string;
  name: string;
  status: ExtraStatus;
}
