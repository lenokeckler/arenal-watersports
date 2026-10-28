import type { RenderHookResult } from "@testing-library/react";
import type { PasswordRecoveryResetFormValues } from "../models/PasswordRecoveryResetFormValues.interface";

export type PasswordRecoveryResetValuesResult =
  RenderHookResult<
    PasswordRecoveryResetFormValues,
    unknown
  >["result"];
