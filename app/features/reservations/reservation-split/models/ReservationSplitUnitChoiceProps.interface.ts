import type { NullableRef } from "@/app/types";
import type { ReservationSplitDraft } from "./ReservationSplitDraft.interface";
import type { ReservationSplitItem } from "./ReservationSplitItem.interface";

export interface ReservationSplitUnitChoiceProps {
  drafts: ReservationSplitDraft[];
  error?: string;
  isFrozen?: boolean;
  onSelect: (departureKey: NullableRef<string>) => void;
  originalTime: string;
  selectedKey: NullableRef<string>;
  unit: ReservationSplitItem;
}
