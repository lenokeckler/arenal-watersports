import type { CloseGroupReturn } from "./CloseGroupReturn.interface";

export interface CloseGroupInput {
  arrivedAt: string;
  dispatchId: string;
  returns: CloseGroupReturn[];
}
