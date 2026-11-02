import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";
import { needsWorkModeChoice } from "@/app/utils/work-mode/needsWorkModeChoice";

export const ensureWorkModeChosen =
  async (): Promise<void> => {
    const overview = await readWorkModeOverviewAsSignedIn();

    if (overview && needsWorkModeChoice(overview)) {
      redirect(PATHS.MODE);
    }
  };
