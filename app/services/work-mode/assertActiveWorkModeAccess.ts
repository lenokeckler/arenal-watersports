import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "./readWorkModeOverviewAsSignedIn";

export const assertActiveWorkModeAccess =
  async (): Promise<void> => {
    const overview = await readWorkModeOverviewAsSignedIn();
    if (overview === null) {
      redirect(PATHS.ACCESS.LOGIN);
    }
    if (overview.current === null) {
      redirect(PATHS.MODE);
    }
  };
