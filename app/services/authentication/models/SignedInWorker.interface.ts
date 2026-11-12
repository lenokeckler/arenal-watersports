import type { WorkArea } from "@/app/types";

export interface SignedInWorker {
  baseRole: WorkArea;
  id: string;
  mustChangePassword: boolean;
  username: string;
}
