import type { RenderHookResult } from "@testing-library/react";
import type { PersonalEmailFormViewModel } from "../models/PersonalEmailFormViewModel.interface";

export type PersonalEmailViewModelResult = RenderHookResult<
  PersonalEmailFormViewModel,
  unknown
>["result"];
