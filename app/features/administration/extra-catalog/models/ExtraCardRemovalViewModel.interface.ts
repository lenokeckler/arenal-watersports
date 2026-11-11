import type { Nullable } from "@/app/types";

export interface ExtraCardRemovalViewModel {
  confirmingExtraId: Nullable<string>;
  onCancelClick: () => void;
  onConfirmRemovalClick: (
    extraId: string
  ) => () => Promise<void>;
  onRemoveClick: (extraId: string) => () => void;
}
