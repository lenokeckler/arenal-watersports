import type { WorkArea } from "@/app/types";

export interface WorkerAreasOverview {
  areas: readonly WorkArea[];
  baseRole: WorkArea;
  fullName: string;
  id: string;
  isExternalGuide: boolean;
  username: string;
}
