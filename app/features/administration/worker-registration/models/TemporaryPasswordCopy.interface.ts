import type { TemporaryPasswordCopyPhase } from "../constants/TemporaryPasswordCopy.constants";

export interface TemporaryPasswordCopy {
  copy: () => Promise<void>;
  phase: TemporaryPasswordCopyPhase;
}
