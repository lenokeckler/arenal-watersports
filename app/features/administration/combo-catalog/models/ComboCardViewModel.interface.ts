import type { NullableRef } from "@/app/types";
import type { ComboStatus } from "./ComboStatus.type";

export interface ComboCardViewModel {
  editHref: string;
  id: string;
  isActionLoading: boolean;
  itemsSummary: string;
  name: string;
  onReactivateClick: () => Promise<void>;
  onRemoveClick: () => void;
  priceLabel: string;
  priceUnit: NullableRef<string>;
  status: ComboStatus;
}
