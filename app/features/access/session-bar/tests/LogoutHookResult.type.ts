import type { RenderHookResult } from "@testing-library/react";
import type { LogoutViewModel } from "../models/LogoutViewModel.interface";

export type LogoutHookResult = RenderHookResult<
  LogoutViewModel,
  unknown
>["result"];
