import type { ChangeEvent, FormEvent } from "react";
import type { NullableRef } from "@/app/types";

export interface DurationAdjustForm {
  canSubmit: boolean;
  errorMessage: NullableRef<string>;
  fieldError: NullableRef<string>;
  handleChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  handleDelta: (delta: number) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  minutesText: string;
}
