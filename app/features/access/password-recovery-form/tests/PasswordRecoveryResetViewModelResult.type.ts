import type { RenderHookResult } from "@testing-library/react";
import type { PasswordRecoveryResetViewModel } from "../models/PasswordRecoveryResetViewModel.interface";

export type PasswordRecoveryResetViewModelResult =
  RenderHookResult<
    PasswordRecoveryResetViewModel,
    unknown
  >["result"];
