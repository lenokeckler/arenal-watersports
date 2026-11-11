import type { FormFieldProps } from "@/app/components/form-field/models/FormFieldProps.interface";
import type { ReservationHistoryFilterValues } from "./ReservationHistoryFilterValues.interface";

export interface ReservationHistoryFieldsProps {
  onChange: FormFieldProps["onChange"];
  values: ReservationHistoryFilterValues;
}
