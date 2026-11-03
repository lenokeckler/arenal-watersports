import { InlineText, Link } from "@/app/components";
import { PATHS, WORK_AREA_LABEL } from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";
import type { NullableRef } from "@/app/types";
import { hasSeveralWorkAreas } from "@/app/utils/work-mode/hasSeveralWorkAreas";
import { WORK_MODE_COPY } from "./constants/WorkModeCopy.constants";
import {
  WORK_MODE_SWITCH_CLASS,
  WORK_MODE_SWITCH_LINK_CLASS,
} from "./styles/WorkMode.styles";

const WorkModeSwitch = async (): Promise<
  NullableRef<React.JSX.Element>
> => {
  const overview = await readWorkModeOverviewAsSignedIn();

  if (
    !overview?.current ||
    !hasSeveralWorkAreas(overview)
  ) {
    return null;
  }

  return (
    <nav
      aria-label={WORK_MODE_COPY.SWITCH_NAVIGATION}
      className={WORK_MODE_SWITCH_CLASS}
    >
      <InlineText>
        {WORK_MODE_COPY.SWITCH_LABEL(
          WORK_AREA_LABEL[overview.current]
        )}
      </InlineText>
      <Link
        href={PATHS.MODE}
        className={WORK_MODE_SWITCH_LINK_CLASS}
      >
        {WORK_MODE_COPY.SWITCH}
      </Link>
    </nav>
  );
};

export default WorkModeSwitch;
