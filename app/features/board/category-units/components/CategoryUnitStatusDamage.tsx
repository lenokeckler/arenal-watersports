import { Text } from "@/app/components";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitStatusDamageProps } from "../models/CategoryUnitStatusDamageProps.interface";
import {
  CATEGORY_UNIT_STATUS_BLOCK_CLASS,
  CATEGORY_UNIT_STATUS_BLOCK_TITLE_CLASS,
  CATEGORY_UNIT_STATUS_JOB_CLASS,
  CATEGORY_UNIT_STATUS_JOB_META_CLASS,
  CATEGORY_UNIT_STATUS_JOB_TITLE_CLASS,
} from "../styles/CategoryUnitStatusSheet.styles";
import { formatStatusDate } from "../utils/formatStatusDate";

const CategoryUnitStatusDamage = ({
  damage,
}: CategoryUnitStatusDamageProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_STATUS_BLOCK_CLASS}>
    <Text
      className={CATEGORY_UNIT_STATUS_BLOCK_TITLE_CLASS}
    >
      {CATEGORY_UNITS_COPY.STATUS_DAMAGE_TITLE}
    </Text>
    <div className={CATEGORY_UNIT_STATUS_JOB_CLASS}>
      <Text className={CATEGORY_UNIT_STATUS_JOB_META_CLASS}>
        {CATEGORY_UNITS_COPY.STATUS_DAMAGE_CAUSE}
      </Text>
      <Text
        className={CATEGORY_UNIT_STATUS_JOB_TITLE_CLASS}
      >
        {CATEGORY_UNITS_COPY.STATUS_DAMAGE_CAUSES[
          damage.cause
        ] ?? damage.cause}
      </Text>
    </div>
    <div className={CATEGORY_UNIT_STATUS_JOB_CLASS}>
      <Text className={CATEGORY_UNIT_STATUS_JOB_META_CLASS}>
        {CATEGORY_UNITS_COPY.STATUS_DAMAGE_WHAT}
      </Text>
      <Text
        className={CATEGORY_UNIT_STATUS_JOB_TITLE_CLASS}
      >
        {damage.description}
      </Text>
    </div>
    <div className={CATEGORY_UNIT_STATUS_JOB_CLASS}>
      <Text className={CATEGORY_UNIT_STATUS_JOB_META_CLASS}>
        {CATEGORY_UNITS_COPY.STATUS_DAMAGE_DATE}
      </Text>
      <Text
        className={CATEGORY_UNIT_STATUS_JOB_TITLE_CLASS}
      >
        {formatStatusDate(damage.reportedAt)}
      </Text>
    </div>
  </div>
);

export default CategoryUnitStatusDamage;
