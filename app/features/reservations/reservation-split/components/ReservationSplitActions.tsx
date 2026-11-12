import { useId } from "react";
import {
  Button,
  MaterialIcon,
  Text,
} from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE } from "@/app/constants";
import {
  RESERVATION_SPLIT_FIELD_ID,
  RESERVATION_SPLIT_FOCUS,
} from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitActionsProps } from "../models/ReservationSplitActionsProps.interface";
import {
  RESERVATION_SPLIT_ACTIONS_CLASS,
  RESERVATION_SPLIT_ADD_NOTE_CLASS,
  RESERVATION_SPLIT_ADD_WRAPPER_CLASS,
  RESERVATION_SPLIT_ALERT_CLASS,
  RESERVATION_SPLIT_SUBMIT_CLASS,
  resolveReservationSplitAddClassName,
} from "../styles/ReservationSplitActions.styles";

const ReservationSplitActions = ({
  viewModel,
}: ReservationSplitActionsProps): React.JSX.Element => {
  const noteId = useId();
  const isAddBlocked = !viewModel.canAddDeparture;

  return (
    <>
      <div className={RESERVATION_SPLIT_ADD_WRAPPER_CLASS}>
        <Button
          type="button"
          variant={BUTTON.SECONDARY}
          aria-disabled={isAddBlocked}
          aria-describedby={
            isAddBlocked ? noteId : undefined
          }
          className={resolveReservationSplitAddClassName(
            isAddBlocked
          )}
          onClick={
            isAddBlocked
              ? undefined
              : viewModel.addDeparture
          }
        >
          <MaterialIcon name={MATERIAL_ICON_NAME.ADD} />
          {RESERVATION_SPLIT_UI_COPY.ADD_DEPARTURE}
        </Button>
        {isAddBlocked && (
          <Text
            id={noteId}
            className={RESERVATION_SPLIT_ADD_NOTE_CLASS}
          >
            {
              RESERVATION_SPLIT_UI_COPY.ADD_DEPARTURE_BLOCKED
            }
          </Text>
        )}
      </div>
      {viewModel.formError && (
        <Text
          id={RESERVATION_SPLIT_FIELD_ID.ALERT}
          role={ARIA_ROLE.ALERT}
          tabIndex={RESERVATION_SPLIT_FOCUS.TAB_INDEX}
          className={RESERVATION_SPLIT_ALERT_CLASS}
        >
          {viewModel.formError}
        </Text>
      )}
      <div
        role={ARIA_ROLE.GROUP}
        aria-label={RESERVATION_SPLIT_UI_COPY.ACTIONS}
        className={RESERVATION_SPLIT_ACTIONS_CLASS}
      >
        <Button
          type="submit"
          variant={BUTTON.PRIMARY}
          className={RESERVATION_SPLIT_SUBMIT_CLASS}
          disabled={viewModel.isSubmitDisabled}
        >
          {viewModel.isPending
            ? RESERVATION_SPLIT_UI_COPY.SUBMITTING
            : RESERVATION_SPLIT_UI_COPY.SUBMIT}
        </Button>
      </div>
    </>
  );
};

export default ReservationSplitActions;
