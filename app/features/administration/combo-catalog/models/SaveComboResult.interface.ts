import type { Status } from "@/app/constants/strings/Status.types";

export interface SaveComboResult {
  comboId?: string;
  message?: string;
  status: Status;
}
