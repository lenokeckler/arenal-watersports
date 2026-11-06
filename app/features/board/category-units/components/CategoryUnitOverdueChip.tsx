import { InlineText } from "@/app/components";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { CATEGORY_UNIT_OVERDUE_CHIP_CLASS } from "../styles/CategoryUnitRow.styles";

const CategoryUnitOverdueChip = (): React.JSX.Element => (
  <div className={CATEGORY_UNIT_OVERDUE_CHIP_CLASS}>
    <InlineText>
      {CATEGORY_UNITS_COPY.OVERDUE_CHIP}
    </InlineText>
  </div>
);

export default CategoryUnitOverdueChip;
