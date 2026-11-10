import { InlineText, Link } from "@/app/components";
import { PATHS, WORK_AREA_LABEL } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { hasSeveralWorkAreas } from "@/app/utils/work-mode/hasSeveralWorkAreas";
import type { WorkModeSwitchProps } from "./models/WorkModeSwitchProps.interface";
import { WORK_MODE_COPY } from "./constants/WorkModeCopy.constants";
import {
  WORK_MODE_SWITCH_CLASS,
  WORK_MODE_SWITCH_LINK_CLASS,
} from "./styles/WorkMode.styles";

const WorkModeSwitch = ({
  overview,
}: WorkModeSwitchProps): NullableRef<React.JSX.Element> => {
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
