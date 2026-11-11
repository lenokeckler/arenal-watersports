import { InlineText } from "@/app/components";
import { CATEGORY_UNIT_STATUS_LABEL } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitStatusChipProps } from "../models/CategoryUnitStatusChipProps.interface";
import {
  CATEGORY_UNIT_STATUS_CHIP_CLASS,
  CATEGORY_UNIT_STATUS_DOT_CLASS,
} from "../styles/CategoryUnitRow.styles";

const CategoryUnitStatusChip = ({
  status,
}: CategoryUnitStatusChipProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_STATUS_CHIP_CLASS[status]}>
    <div
      aria-hidden
      className={CATEGORY_UNIT_STATUS_DOT_CLASS[status]}
    />
    <InlineText>
      {CATEGORY_UNIT_STATUS_LABEL[status]}
    </InlineText>
  </div>
);

export default CategoryUnitStatusChip;
