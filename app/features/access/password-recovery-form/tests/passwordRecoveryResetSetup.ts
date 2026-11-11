import { vi } from "vitest";
import { redirect } from "next/navigation";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPasswordRecoveryReset } from "../actions/submitPasswordRecoveryReset";
import { createPasswordRecoveryResetFormData } from "./createPasswordRecoveryResetFormData";
import { RESET_INPUT } from "./passwordRecoveryReset.constants";

export const arrangeResetMocks = (): void => {
  vi.resetAllMocks();
  vi.mocked(redirect).mockImplementation(() => {
    throw new Error(REDIRECT_SIGNAL_MESSAGE);
  });
};

export const submitReset = () =>
  submitPasswordRecoveryReset(
    null,
    createPasswordRecoveryResetFormData(RESET_INPUT)
  );
