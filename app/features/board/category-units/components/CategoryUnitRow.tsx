import { Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import type { CategoryUnitRowProps } from "../models/CategoryUnitRowProps.interface";
import {
  CATEGORY_UNIT_ROW_CLASS,
  CATEGORY_UNIT_ROW_CODE_CLASS,
  CATEGORY_UNIT_ROW_HEADER_CLASS,
} from "../styles/CategoryUnitRow.styles";
import CategoryUnitReservation from "./CategoryUnitReservation";
import CategoryUnitStatusChip from "./CategoryUnitStatusChip";

const CategoryUnitRow = ({
  unit,
}: CategoryUnitRowProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_ROW_CLASS}>
    <div className={CATEGORY_UNIT_ROW_HEADER_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={unit.code}
        className={CATEGORY_UNIT_ROW_CODE_CLASS}
      />
      <CategoryUnitStatusChip status={unit.status} />
    </div>
    {unit.occupancy && (
      <CategoryUnitReservation occupancy={unit.occupancy} />
    )}
  </div>
);

export default CategoryUnitRow;
