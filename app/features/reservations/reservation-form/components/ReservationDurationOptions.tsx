import { BUTTON } from "@/app/constants";
import Button from "@/app/components/button/Button";
import { RESERVATION_DURATION_PRESETS } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_FORM_DURATION_GRID_CLASS,
  resolveReservationDurationButtonClassName,
} from "../styles/ReservationFormView.styles";

const ReservationDurationOptions = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_DURATION_GRID_CLASS}>
    {RESERVATION_DURATION_PRESETS.map((preset) => {
      const isSelected =
        !viewModel.isCustomDuration &&
        viewModel.values.durationHours === preset.hours;

      return (
        <Button
          key={preset.hours}
          type="button"
          variant={BUTTON.BASE}
          aria-pressed={isSelected}
          className={resolveReservationDurationButtonClassName(
            isSelected
          )}
          onClick={() =>
            viewModel.handleDurationChange(preset.hours)
          }
        >
          {preset.label}
        </Button>
      );
    })}
    <Button
      type="button"
      variant={BUTTON.BASE}
      aria-pressed={viewModel.isCustomDuration}
      className={resolveReservationDurationButtonClassName(
        viewModel.isCustomDuration
      )}
      onClick={viewModel.handleCustomDurationSelection}
    >
      {RESERVATION_FORM_UI_COPY.CUSTOM_DURATION_OPTION}
    </Button>
  </div>
);

export default ReservationDurationOptions;
