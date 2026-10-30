import { redirect } from "next/navigation";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode/readWorkModeOverviewAsSignedIn";

export const assertOperationsCalendarAccess =
  async (): Promise<void> => {
    const overview = await readWorkModeOverviewAsSignedIn();
    if (overview === null) {
      redirect(PATHS.ACCESS.LOGIN);
    }
    if (
      !overview.areas.includes(
        SUPABASE_WORK_AREA.OPERATIONS
      )
    ) {
      redirect(PATHS.HOME);
    }
    if (overview.current === null) {
      redirect(PATHS.MODE);
    }
    if (
      overview.current !== SUPABASE_WORK_AREA.OPERATIONS
    ) {
      redirect(PATHS.HOME);
    }
  };
