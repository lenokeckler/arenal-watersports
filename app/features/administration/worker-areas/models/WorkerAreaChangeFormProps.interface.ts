import type {
  GrantableWorkerArea,
  WorkerAreaIntent,
} from "@/app/constants";
import type { WorkerAreaChangeServerAction } from "./WorkerAreaChangeServerAction.type";

export interface WorkerAreaChangeFormProps {
  action: WorkerAreaChangeServerAction;
  area: GrantableWorkerArea;
  intent: WorkerAreaIntent;
  username: string;
  workerId: string;
}
