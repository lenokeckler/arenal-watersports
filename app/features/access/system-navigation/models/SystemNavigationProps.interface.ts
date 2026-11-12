import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";
import type { SystemNavigationMenuIdentity } from "./SystemNavigationMenuIdentity.interface";

export interface SystemNavigationProps {
  menuExtras?: React.ReactNode;
  menuIdentity?: SystemNavigationMenuIdentity | null;
  overview: WorkModeOverview;
}
