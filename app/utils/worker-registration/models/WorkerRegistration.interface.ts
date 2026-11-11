import type { AssignableBaseRole } from "@/app/constants";

export interface WorkerRegistration {
  baseRole: AssignableBaseRole;
  fullName: string;
  username: string;
}
