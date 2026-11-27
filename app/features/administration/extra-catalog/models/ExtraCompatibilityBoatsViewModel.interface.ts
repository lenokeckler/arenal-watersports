import type { NullableRef } from "@/app/types";
import type { ExtraCompatibilityBoatGroup } from "./ExtraCompatibilityBoatGroup.interface";

export interface ExtraCompatibilityBoatsViewModel {
  dirtyLabel: NullableRef<string>;
  groups: ExtraCompatibilityBoatGroup[];
  isLeaveSheetOpen: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onLeaveDiscard: () => void;
  onLeaveSave: () => Promise<void>;
  onLeaveStay: () => void;
  onSave: () => Promise<void>;
  totalLabel: string;
}
