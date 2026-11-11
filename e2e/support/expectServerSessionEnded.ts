import { expect } from "@playwright/test";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { countAuthSessions } from "./countAuthSessions";

export const expectServerSessionEnded = async (
  userId: string
): Promise<void> => {
  await expect
    .configure({ soft: true })
    .poll(() => countAuthSessions(userId))
    .toBe(E2E_COUNT.NONE);
};
