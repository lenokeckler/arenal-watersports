import type { ComboActionResult } from "./ComboActionResult.interface";

export interface RunComboActionOptions {
  action: (comboId: string) => Promise<ComboActionResult>;
  comboId: string;
  genericErrorMessage: string;
}
