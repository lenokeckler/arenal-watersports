import type { FormFocusTrigger } from "./models/FormFocusTrigger.interface";

export const isNewFocusRequest = <TError>(
  handled: FormFocusTrigger<TError>,
  current: FormFocusTrigger<TError>
): boolean =>
  current.invalidSubmitCount !==
    handled.invalidSubmitCount ||
  (current.serverError !== null &&
    current.serverError !== handled.serverError);
