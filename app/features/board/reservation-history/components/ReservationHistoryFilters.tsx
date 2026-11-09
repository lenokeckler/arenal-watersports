"use client";

import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { API, PATHS } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { useReservationHistoryFiltersViewModel } from "../hooks/useReservationHistoryFiltersViewModel";
import type { ReservationHistoryFiltersProps } from "../models/ReservationHistoryFiltersProps.interface";
import {
  RESERVATION_HISTORY_FILTERS_FORM_CLASS,
  RESERVATION_HISTORY_FILTERS_SUBMIT_CLASS,
} from "../styles/ReservationHistoryFilters.styles";
import ReservationHistoryDateFields from "./ReservationHistoryDateFields";
import ReservationHistorySelectFields from "./ReservationHistorySelectFields";

const ReservationHistoryFilters = ({
  categoryOptions,
  filters,
  hasInvertedDateRange,
}: ReservationHistoryFiltersProps): React.JSX.Element => {
  const { handleChange, handleSubmit, isPending, values } =
    useReservationHistoryFiltersViewModel({ filters });

  return (
    <form
      method={API.METHODS.GET}
      action={PATHS.HISTORY.ROOT}
      onSubmit={handleSubmit}
      className={RESERVATION_HISTORY_FILTERS_FORM_CLASS}
    >
      <ReservationHistoryDateFields
        values={values}
        onChange={handleChange}
        hasInvertedDateRange={hasInvertedDateRange}
      />
      <ReservationHistorySelectFields
        values={values}
        onChange={handleChange}
        categoryOptions={categoryOptions}
      />
      <div
        className={RESERVATION_HISTORY_FILTERS_SUBMIT_CLASS}
      >
        <FormSubmitButton
          icon={MATERIAL_ICON_NAME.SEARCH}
          isPending={isPending}
          label={RESERVATION_HISTORY_COPY.FILTER_SUBMIT}
          pendingLabel={
            RESERVATION_HISTORY_COPY.FILTER_SUBMIT_PENDING
          }
        />
      </div>
    </form>
  );
};

export default ReservationHistoryFilters;
