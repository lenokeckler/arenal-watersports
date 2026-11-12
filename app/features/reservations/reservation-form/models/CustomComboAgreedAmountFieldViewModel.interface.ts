import type { ChangeEvent } from "react";

export interface CustomComboAgreedAmountFieldViewModel {
  error: string;
  handleChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  placeholder: string;
  value: string;
}
