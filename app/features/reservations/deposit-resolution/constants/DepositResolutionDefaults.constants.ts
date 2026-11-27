import { STRING } from "@/app/constants";
import type { DepositResolutionErrors } from "../models/DepositResolutionErrors.interface";
import type { DepositResolutionValues } from "../models/DepositResolutionValues.interface";

export const DEPOSIT_RESOLUTION_NO_ERRORS: DepositResolutionErrors =
  {};

export const DEPOSIT_RESOLUTION_NO_FORM_ERROR: string =
  STRING.Empty;

export const DEPOSIT_RESOLUTION_INITIAL_VALUES: DepositResolutionValues =
  {
    reasonText: STRING.Empty,
    returnedText: STRING.Empty,
    returnsAll: true,
  };
