import { useState } from "react";
import {
  TEMPORARY_PASSWORD_COPY_PHASE,
  type TemporaryPasswordCopyPhase,
} from "../constants/TemporaryPasswordBox.constants";
import type { TemporaryPasswordCopy } from "../models/TemporaryPasswordCopy.interface";

export const useTemporaryPasswordCopy = (
  temporaryPassword: string
): TemporaryPasswordCopy => {
  const [phase, setPhase] =
    useState<TemporaryPasswordCopyPhase>(
      TEMPORARY_PASSWORD_COPY_PHASE.IDLE
    );

  return {
    copy: async () => {
      try {
        await navigator.clipboard.writeText(
          temporaryPassword
        );
        setPhase(TEMPORARY_PASSWORD_COPY_PHASE.COPIED);
      } catch {
        setPhase(TEMPORARY_PASSWORD_COPY_PHASE.FAILED);
      }
    },
    phase,
  };
};
