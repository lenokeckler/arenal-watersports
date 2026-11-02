import { useId } from "react";
import { ARIA_ROLE } from "@/app/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitQuantityStepperProps } from "../models/ReservationSplitQuantityStepperProps.interface";
import {
  RESERVATION_SPLIT_STEPPER_ERROR_CLASS,
  RESERVATION_SPLIT_STEPPER_GROUP_CLASS,
  RESERVATION_SPLIT_STEPPER_HELPER_CLASS,
  RESERVATION_SPLIT_STEPPER_LABEL_CLASS,
  RESERVATION_SPLIT_STEPPER_ROW_CLASS,
  RESERVATION_SPLIT_STEPPER_SCREEN_READER_CLASS,
  RESERVATION_SPLIT_STEPPER_VALUE_CLASS,
  RESERVATION_SPLIT_STEPPER_WRAPPER_CLASS,
  resolveReservationSplitStepperButtonClassName,
} from "../styles/ReservationSplitQuantityStepper.styles";

const ReservationSplitQuantityStepper = ({
  canDecrease,
  canIncrease,
  departureNumber,
  error,
  label,
  onDecrease,
  onIncrease,
  value,
}: ReservationSplitQuantityStepperProps): React.JSX.Element => {
  const maxId = useId();
  const errorId = useId();
  const describedBy =
    [!canIncrease && maxId, error && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div
      className={RESERVATION_SPLIT_STEPPER_WRAPPER_CLASS}
    >
      <div className={RESERVATION_SPLIT_STEPPER_ROW_CLASS}>
        <span
          className={RESERVATION_SPLIT_STEPPER_LABEL_CLASS}
        >
          {label}
        </span>
        <div
          role={ARIA_ROLE.GROUP}
          aria-label={RESERVATION_SPLIT_UI_COPY.STEPPER_GROUP_ARIA(
            label,
            departureNumber
          )}
          aria-describedby={describedBy}
          className={RESERVATION_SPLIT_STEPPER_GROUP_CLASS}
        >
          <button
            type="button"
            aria-label={RESERVATION_SPLIT_UI_COPY.STEPPER_REMOVE_ARIA(
              label,
              departureNumber
            )}
            aria-disabled={!canDecrease}
            className={resolveReservationSplitStepperButtonClassName(
              !canDecrease
            )}
            onClick={canDecrease ? onDecrease : undefined}
          >
            <MaterialIcon
              name={MATERIAL_ICON_NAME.REMOVE}
            />
          </button>
          <span
            aria-hidden
            className={
              RESERVATION_SPLIT_STEPPER_VALUE_CLASS
            }
          >
            {value}
          </span>
          <span
            className={
              RESERVATION_SPLIT_STEPPER_SCREEN_READER_CLASS
            }
          >
            {RESERVATION_SPLIT_UI_COPY.STEPPER_VALUE_SR(
              value
            )}
          </span>
          <button
            type="button"
            aria-label={RESERVATION_SPLIT_UI_COPY.STEPPER_ADD_ARIA(
              label,
              departureNumber
            )}
            aria-disabled={!canIncrease}
            className={resolveReservationSplitStepperButtonClassName(
              !canIncrease
            )}
            onClick={canIncrease ? onIncrease : undefined}
          >
            <MaterialIcon name={MATERIAL_ICON_NAME.ADD} />
          </button>
        </div>
      </div>
      {!canIncrease && (
        <p
          id={maxId}
          className={RESERVATION_SPLIT_STEPPER_HELPER_CLASS}
        >
          {RESERVATION_SPLIT_UI_COPY.STEPPER_AT_MAX}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className={RESERVATION_SPLIT_STEPPER_ERROR_CLASS}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default ReservationSplitQuantityStepper;
