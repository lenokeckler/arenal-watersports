import { E2E_VIEWPORT } from "../constants/E2eRuntime.constants";

export type SystemNavigationViewport =
  (typeof E2E_VIEWPORT)[keyof typeof E2E_VIEWPORT];
