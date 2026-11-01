import type { FormFieldProps } from "@/app/components/form-field/models/FormFieldProps.interface";
import { STRING } from "@/app/constants";
import type { ReservationHistoryCategoryOption } from "@/app/services/board/reservation-history/models/ReservationHistoryCategoryOption.interface";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_ALL_OPTION } from "../constants/ReservationHistoryTypeOptions.constants";

export const buildReservationHistoryCategoryFilterOptions =
  (
    categories: readonly ReservationHistoryCategoryOption[],
    selectedId: string
  ): NonNullable<FormFieldProps["options"]> => {
    const options = categories.map(({ id, name }) => ({
      key: id,
      label: name,
      value: id,
    }));
    const isUnlisted =
      selectedId !== STRING.Empty &&
      !categories.some(({ id }) => id === selectedId);

    return [
      RESERVATION_HISTORY_ALL_OPTION,
      ...options,
      ...(isUnlisted
        ? [
            {
              key: selectedId,
              label:
                RESERVATION_HISTORY_COPY.FILTER_CATEGORY_UNAVAILABLE,
              value: selectedId,
            },
          ]
        : []),
    ];
  };
