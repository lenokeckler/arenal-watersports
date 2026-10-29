import type { FormFocusTrigger } from "../models/FormFocusTrigger.interface";

export const SERVER_ERROR = { code: "first" };
export const OTHER_SERVER_ERROR = { code: "second" };

export const IDLE_TRIGGER: FormFocusTrigger<
  typeof SERVER_ERROR
> = { invalidSubmitCount: 0, serverError: null };
export const ONE_INVALID_SUBMIT: FormFocusTrigger<
  typeof SERVER_ERROR
> = { invalidSubmitCount: 1, serverError: null };
export const WITH_SERVER_ERROR: FormFocusTrigger<
  typeof SERVER_ERROR
> = { invalidSubmitCount: 0, serverError: SERVER_ERROR };
export const WITH_OTHER_SERVER_ERROR: FormFocusTrigger<
  typeof SERVER_ERROR
> = {
  invalidSubmitCount: 0,
  serverError: OTHER_SERVER_ERROR,
};
