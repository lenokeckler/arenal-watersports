import type { RenderHookResult } from "@testing-library/react";
import type { PasswordChangeFormViewModel } from "../models/PasswordChangeFormViewModel.interface";

export type PasswordChangeViewModelResult =
  RenderHookResult<
    PasswordChangeFormViewModel,
    unknown
  >["result"];
