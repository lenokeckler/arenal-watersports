import Text from "@/app/components/text/Text";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants/Button.types";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import {
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_RETRY_BUTTON_CLASS,
  RESERVATION_FORM_STATUS_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationFormFeedback = ({
  categories,
  viewModel,
}: ReservationFormCardProps): React.JSX.Element => (
  <>
    {viewModel.isEquipmentEligibilityLoading && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_STATUS_CLASS}
      >
        {
          RESERVATION_FORM_UI_COPY.EQUIPMENT_ELIGIBILITY_LOADING
        }
      </Text>
    )}
    {viewModel.hasEquipmentEligibilityError && (
      <>
        <Text
          role={ARIA_ROLE.ALERT}
          className={RESERVATION_FORM_ERROR_CLASS}
        >
          {
            RESERVATION_FORM_UI_COPY.EQUIPMENT_ELIGIBILITY_ERROR
          }
        </Text>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.SECONDARY}
          className={RESERVATION_FORM_RETRY_BUTTON_CLASS}
          onClick={
            viewModel.handleRetryEquipmentEligibility
          }
          isLoading={
            viewModel.isEquipmentEligibilityLoading
          }
        >
          {
            RESERVATION_FORM_UI_COPY.RETRY_EQUIPMENT_ELIGIBILITY
          }
        </Button>
      </>
    )}
    {categories.length === 0 &&
      !viewModel.hasEquipmentEligibilityError &&
      !viewModel.isEquipmentEligibilityLoading && (
        <Text
          role={ARIA_ROLE.STATUS}
          className={RESERVATION_FORM_ERROR_CLASS}
        >
          {RESERVATION_FORM_UI_COPY.NO_CATEGORIES}
        </Text>
      )}
    {viewModel.formError && (
      <Text
        role={ARIA_ROLE.ALERT}
        className={RESERVATION_FORM_ERROR_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    {viewModel.hasEquipmentSelectionChanged && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_STATUS_CLASS}
      >
        {
          RESERVATION_FORM_UI_COPY.EQUIPMENT_SELECTION_CHANGED
        }
      </Text>
    )}
    {viewModel.isSubmitted && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_STATUS_CLASS}
      >
        {RESERVATION_FORM_UI_COPY.SUCCESS}
      </Text>
    )}
  </>
);

export default ReservationFormFeedback;
