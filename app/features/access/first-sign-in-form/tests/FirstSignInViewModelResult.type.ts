import type { RenderHookResult } from "@testing-library/react";
import type { FirstSignInFormViewModel } from "../models/FirstSignInFormViewModel.interface";

export type FirstSignInViewModelResult = RenderHookResult<
  FirstSignInFormViewModel,
  unknown
>["result"];
