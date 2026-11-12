import { FORM_SUBMIT_BUTTON_TONE } from "../constants/FormSubmitButtonTone.constants";

export type FormSubmitButtonTone =
  (typeof FORM_SUBMIT_BUTTON_TONE)[keyof typeof FORM_SUBMIT_BUTTON_TONE];
