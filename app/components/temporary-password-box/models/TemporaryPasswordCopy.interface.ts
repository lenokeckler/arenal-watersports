import type { TemporaryPasswordCopyPhase } from "../constants/TemporaryPasswordBox.constants";

export interface TemporaryPasswordCopy {
  copy: () => Promise<void>;
  phase: TemporaryPasswordCopyPhase;
}
