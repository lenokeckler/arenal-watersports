import type { RenderHookResult } from "@testing-library/react";
import type { PasswordRecoveryRequestViewModel } from "../models/PasswordRecoveryRequestViewModel.interface";

export type PasswordRecoveryRequestViewModelResult =
  RenderHookResult<
    PasswordRecoveryRequestViewModel,
    unknown
  >["result"];
