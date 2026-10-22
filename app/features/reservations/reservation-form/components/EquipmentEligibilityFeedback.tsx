import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants/Button.types";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import {
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_RETRY_BUTTON_CLASS,
  RESERVATION_FORM_STATUS_CLASS,
} from "../styles/ReservationFormView.styles";

const EquipmentEligibilityErrorFeedback = ({
  viewModel,
}: ReservationFormCardProps): React.JSX.Element => (
  <>
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
  </>
);

const EquipmentEligibilityFeedback = ({
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
    <EquipmentEligibilityErrorFeedback
      categories={categories}
      viewModel={viewModel}
    />
  </>
);

export default EquipmentEligibilityFeedback;
