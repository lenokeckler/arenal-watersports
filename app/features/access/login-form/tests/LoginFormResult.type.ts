import type { RenderHookResult } from "@testing-library/react";
import type { LoginFormViewModel } from "../models/LoginFormViewModel.interface";

export type LoginFormResult = RenderHookResult<
  LoginFormViewModel,
  unknown
>["result"];
