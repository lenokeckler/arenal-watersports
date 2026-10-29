import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";
import type { FieldErrorCase } from "./FieldErrorCase.interface";

export const FIELD_ERROR_CASES: FieldErrorCase[] = [
  {
    error: {
      code: SIGN_IN_ERROR_CODE.USERNAME_REQUIRED,
      field: SIGN_IN_FIELD.USERNAME,
    },
    field: SIGN_IN_FIELD.USERNAME,
    label: "username",
  },
  {
    error: {
      code: SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS,
      field: SIGN_IN_FIELD.PASSWORD,
    },
    field: SIGN_IN_FIELD.PASSWORD,
    label: "password",
  },
  {
    error: {
      code: SIGN_IN_ERROR_CODE.NETWORK,
      field: SIGN_IN_FIELD.FORM,
    },
    field: SIGN_IN_FIELD.FORM,
    label: "form",
  },
];
