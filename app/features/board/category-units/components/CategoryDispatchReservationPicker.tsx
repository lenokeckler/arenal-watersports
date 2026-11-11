"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import { DISPATCH_SHEET_PHASE } from "@/app/components/dispatch-board/constants/DispatchSheetCopy.constants";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { useCategoryDispatchReservations } from "../hooks/useCategoryDispatchReservations";
import type { CategoryDispatchReservationPickerProps } from "../models/CategoryDispatchReservationPickerProps.interface";
import {
  CATEGORY_UNITS_PICKER_ALERT_CLASS,
  CATEGORY_UNITS_PICKER_LIST_CLASS,
  CATEGORY_UNITS_PICKER_NOTE_CLASS,
} from "../styles/CategoryUnits.styles";
import CategoryDispatchReservationOption from "./CategoryDispatchReservationOption";

const CategoryDispatchReservationPicker = ({
  categoryId,
  onChoose,
  onClose,
  selectedCount,
}: CategoryDispatchReservationPickerProps): React.JSX.Element => {
  const { phase, reservations } =
    useCategoryDispatchReservations(categoryId);

  return (
    <ActionSheet
      title={CATEGORY_UNITS_COPY.PICKER_TITLE}
      onClose={onClose}
    >
      {phase === DISPATCH_SHEET_PHASE.LOADING && (
        <Text className={CATEGORY_UNITS_PICKER_NOTE_CLASS}>
          {CATEGORY_UNITS_COPY.PICKER_LOADING}
        </Text>
      )}
      {phase === DISPATCH_SHEET_PHASE.FAILED && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={CATEGORY_UNITS_PICKER_ALERT_CLASS}
        >
          {CATEGORY_UNITS_COPY.PICKER_ERROR}
        </Text>
      )}
      {phase === DISPATCH_SHEET_PHASE.READY &&
        reservations.length === 0 && (
          <Text
            className={CATEGORY_UNITS_PICKER_NOTE_CLASS}
          >
            {CATEGORY_UNITS_COPY.PICKER_EMPTY}
          </Text>
        )}
      {phase === DISPATCH_SHEET_PHASE.READY &&
        reservations.length > 0 && (
          <div
            role={ARIA_ROLE.LIST}
            aria-label={
              CATEGORY_UNITS_COPY.PICKER_LIST_LABEL
            }
            className={CATEGORY_UNITS_PICKER_LIST_CLASS}
          >
            {reservations.map((reservation) => (
              <div
                key={reservation.reservationId}
                role={ARIA_ROLE.LISTITEM}
              >
                <CategoryDispatchReservationOption
                  onChoose={onChoose}
                  reservation={reservation}
                  selectedCount={selectedCount}
                />
              </div>
            ))}
          </div>
        )}
    </ActionSheet>
  );
};

export default CategoryDispatchReservationPicker;
