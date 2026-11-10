import { Text } from "@/app/components";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReservationProps } from "../models/CategoryUnitReservationProps.interface";
import {
  CATEGORY_UNIT_CUSTOMER_CLASS,
  CATEGORY_UNIT_DETAIL_CLASS,
  resolveCategoryUnitReturnClass,
} from "../styles/CategoryUnitRow.styles";
import { formatCategoryUnitReturn } from "../utils/formatCategoryUnitReturn";
import CategoryUnitReservationReference from "./CategoryUnitReservationReference";

const CategoryUnitReservation = ({
  occupancy,
}: CategoryUnitReservationProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_DETAIL_CLASS}>
    <Text
      className={resolveCategoryUnitReturnClass(
        occupancy.isOverdue
      )}
    >
      {formatCategoryUnitReturn(
        occupancy.returnsAt,
        new Date(),
        occupancy.isOverdue
      )}
    </Text>
    <Text className={CATEGORY_UNIT_CUSTOMER_CLASS}>
      {CATEGORY_UNITS_COPY.CUSTOMER_LINE(
        occupancy.customerName
      )}
    </Text>
    <CategoryUnitReservationReference
      occupancy={occupancy}
    />
  </div>
);

export default CategoryUnitReservation;
