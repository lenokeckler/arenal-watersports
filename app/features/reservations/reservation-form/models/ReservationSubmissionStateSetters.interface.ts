import type { Dispatch, SetStateAction } from "react";
import type { ReservationFormField } from "./ReservationFormField.constants";

export interface ReservationSubmissionStateSetters {
  setErrors: Dispatch<
    SetStateAction<
      Partial<Record<ReservationFormField, string>>
    >
  >;
  setFormError: Dispatch<SetStateAction<string>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}
