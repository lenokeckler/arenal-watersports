import type { RefCallback } from "react";
import type { SystemNavigationViewModel } from "./SystemNavigationViewModel.interface";

export type SystemNavigationViewModelResult = readonly [
  SystemNavigationViewModel,
  RefCallback<HTMLElement>,
];
