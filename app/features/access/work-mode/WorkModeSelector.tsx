import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";
import { hasSeveralWorkAreas } from "@/app/utils/work-mode/hasSeveralWorkAreas";
import { submitWorkModeChoice } from "./actions/submitWorkModeChoice";
import WorkModeCard from "./components/WorkModeCard";
import WorkModeHeading from "./components/WorkModeHeading";
import { WORK_MODE_AREA_ORDER } from "./constants/WorkModeAreas.constants";
import {
  WORK_MODE_CARDS_CLASS,
  WORK_MODE_STACK_CLASS,
} from "./styles/WorkMode.styles";

const WorkModeSelector =
  async (): Promise<React.JSX.Element> => {
    const overview = await readWorkModeOverviewAsSignedIn();

    if (!overview) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    if (!hasSeveralWorkAreas(overview)) {
      redirect(PATHS.HOME);
    }

    return (
      <div className={WORK_MODE_STACK_CLASS}>
        <WorkModeHeading />
        <div className={WORK_MODE_CARDS_CLASS}>
          {WORK_MODE_AREA_ORDER.filter((area) =>
            overview.areas.includes(area)
          ).map((area) => (
            <WorkModeCard
              key={area}
              action={submitWorkModeChoice}
              area={area}
              isCurrent={overview.current === area}
            />
          ))}
        </div>
      </div>
    );
  };

export default WorkModeSelector;
