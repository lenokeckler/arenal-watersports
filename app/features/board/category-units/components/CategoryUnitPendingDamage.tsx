import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import { PATHS } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitPendingDamageProps } from "../models/CategoryUnitPendingDamageProps.interface";
import {
  CATEGORY_UNIT_PENDING_CLASS,
  CATEGORY_UNIT_PENDING_LINK_CLASS,
} from "../styles/CategoryUnitStatusSheet.styles";

const CategoryUnitPendingDamage = ({
  reportId,
}: CategoryUnitPendingDamageProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_PENDING_CLASS}>
    <Text>{CATEGORY_UNITS_COPY.STATUS_DAMAGE_PENDING}</Text>
    <Link
      href={PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE(
        reportId
      )}
      className={CATEGORY_UNIT_PENDING_LINK_CLASS}
    >
      {CATEGORY_UNITS_COPY.STATUS_DAMAGE_COMPLETE}
    </Link>
  </div>
);

export default CategoryUnitPendingDamage;
