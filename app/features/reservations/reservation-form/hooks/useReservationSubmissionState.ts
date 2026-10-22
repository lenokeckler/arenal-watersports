import { useState } from "react";
import { STRING } from "@/app/constants";
import { EMPTY_RESERVATION_FORM_ERRORS } from "../constants/ReservationSubmissionState.constants";
import { createReservationSubmissionStateHandlers } from "../utils/createReservationSubmissionStateHandlers";

export const useReservationSubmissionState = () => {
  const [errors, setErrors] = useState(
    EMPTY_RESERVATION_FORM_ERRORS
  );
  const [formError, setFormError] = useState<string>(
    STRING.Empty
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  return {
    ...createReservationSubmissionStateHandlers({
      setErrors,
      setFormError,
      setIsSubmitted,
    }),
    errors,
    formError,
    isSubmitted,
    setSubmissionError: setFormError,
  };
};
