import { Text } from "@/app/components";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReservationReferenceProps } from "../models/CategoryUnitReservationReferenceProps.interface";
import { CATEGORY_UNIT_REFERENCE_CLASS } from "../styles/CategoryUnitRow.styles";
import { formatReservationWindow } from "../utils/formatReservationWindow";

const CategoryUnitReservationReference = ({
  occupancy,
}: CategoryUnitReservationReferenceProps): React.JSX.Element => (
  <Text className={CATEGORY_UNIT_REFERENCE_CLASS}>
    {CATEGORY_UNITS_COPY.RESERVATION_LINE(
      occupancy.reservationCode,
      formatReservationWindow(
        occupancy.reservationStartsAt,
        occupancy.reservationEndsAt
      )
    )}
  </Text>
);

export default CategoryUnitReservationReference;
