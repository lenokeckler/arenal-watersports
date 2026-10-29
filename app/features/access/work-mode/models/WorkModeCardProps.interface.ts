import type { WorkArea } from "@/app/types";
import type { WorkModeChoiceServerAction } from "./WorkModeChoiceServerAction.type";

export interface WorkModeCardProps {
  action: WorkModeChoiceServerAction;
  area: WorkArea;
  isCurrent: boolean;
}
