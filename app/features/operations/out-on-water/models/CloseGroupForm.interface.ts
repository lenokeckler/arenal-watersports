import type { FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import type { CloseGroupDraft } from "./CloseGroupDraft.interface";
import type { ReturnReadingRow } from "./ReturnReadingRow.interface";

export interface CloseGroupForm {
  arrivalError: NullableRef<string>;
  arrivalTime: string;
  canSubmit: boolean;
  errorMessage: NullableRef<string>;
  handleArrivalChange: (value: string) => void;
  handleDraftChange: (
    unitId: string,
    change: Partial<CloseGroupDraft>
  ) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  rows: ReturnReadingRow[];
}
