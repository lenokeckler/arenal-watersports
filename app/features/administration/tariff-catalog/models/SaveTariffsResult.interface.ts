import type { Status } from "@/app/constants/strings/Status.types";

export interface SaveTariffsResult {
  message?: string;
  status: Status;
}
