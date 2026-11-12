import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_UNITS_CONNECTION_NOTICE_CLASS,
  CATEGORY_UNITS_ERROR_BODY_CLASS,
  CATEGORY_UNITS_ERROR_TITLE_CLASS,
} from "../styles/CategoryUnitsState.styles";

const CategoryUnitsConnectionNotice =
  (): React.JSX.Element => (
    <div
      role={ARIA_ROLE.ALERT}
      className={CATEGORY_UNITS_CONNECTION_NOTICE_CLASS}
    >
      <Text className={CATEGORY_UNITS_ERROR_TITLE_CLASS}>
        {CATEGORY_UNITS_COPY.LIVE_UPDATES_LOST_TITLE}
      </Text>
      <Text className={CATEGORY_UNITS_ERROR_BODY_CLASS}>
        {CATEGORY_UNITS_COPY.LIVE_UPDATES_LOST_BODY}
      </Text>
    </div>
  );

export default CategoryUnitsConnectionNotice;
