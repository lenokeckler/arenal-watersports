import { redirect } from "next/navigation";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode/readWorkModeOverviewAsSignedIn";

export const assertReservationCalendarAccess = async (
  workArea: WorkArea = SUPABASE_WORK_AREA.RESERVATIONS
): Promise<void> => {
  const overview = await readWorkModeOverviewAsSignedIn();
  if (overview === null) {
    redirect(PATHS.ACCESS.LOGIN);
  }
  if (!overview.areas.includes(workArea)) {
    redirect(PATHS.HOME);
  }
  if (overview.current === null) {
    redirect(PATHS.MODE);
  }
  if (overview.current !== workArea) {
    redirect(PATHS.HOME);
  }
};
