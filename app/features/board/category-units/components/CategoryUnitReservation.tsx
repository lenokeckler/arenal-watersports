import { Text } from "@/app/components";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReservationProps } from "../models/CategoryUnitReservationProps.interface";
import {
  CATEGORY_UNIT_CUSTOMER_CLASS,
  CATEGORY_UNIT_DETAIL_CLASS,
  CATEGORY_UNIT_RETURN_CLASS,
} from "../styles/CategoryUnitRow.styles";
import { formatCategoryUnitReturn } from "../utils/formatCategoryUnitReturn";
import CategoryUnitReservationReference from "./CategoryUnitReservationReference";

const CategoryUnitReservation = ({
  occupancy,
}: CategoryUnitReservationProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_DETAIL_CLASS}>
    <Text className={CATEGORY_UNIT_RETURN_CLASS}>
      {formatCategoryUnitReturn(
        occupancy.returnsAt,
        new Date()
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
