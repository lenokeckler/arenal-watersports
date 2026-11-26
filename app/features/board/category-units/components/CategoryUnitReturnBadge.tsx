import { formatCostaRicaTimeTwelveHour } from "@/app/components/dispatch-board/utils/formatCostaRicaTimeTwelveHour";
import { InlineText } from "@/app/components";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReturnBadgeProps } from "../models/CategoryUnitReturnBadgeProps.interface";
import { resolveCategoryUnitReturnBadgeClass } from "../styles/CategoryUnitRow.styles";

const CategoryUnitReturnBadge = ({
  isOverdue,
  returnsAt,
}: CategoryUnitReturnBadgeProps): React.JSX.Element => (
  <InlineText
    className={resolveCategoryUnitReturnBadgeClass(
      isOverdue
    )}
  >
    {CATEGORY_UNITS_COPY.RETURN_BADGE(
      formatCostaRicaTimeTwelveHour(returnsAt)
    )}
  </InlineText>
);

export default CategoryUnitReturnBadge;
