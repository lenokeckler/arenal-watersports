import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import { RESERVATION_FORM_ERROR_CLASS } from "../styles/ReservationFormView.styles";

const ReservationCategoryFeedback = ({
  categories,
  viewModel,
}: ReservationFormCardProps): React.JSX.Element => {
  const shouldShowEmptyCategories =
    categories.length === 0 &&
    !viewModel.predefinedCombo.selectedCombo &&
    !viewModel.hasEquipmentEligibilityError &&
    !viewModel.isEquipmentEligibilityLoading;

  return (
    <>
      {shouldShowEmptyCategories && (
        <Text
          role={ARIA_ROLE.STATUS}
          className={RESERVATION_FORM_ERROR_CLASS}
        >
          {RESERVATION_FORM_UI_COPY.NO_CATEGORIES}
        </Text>
      )}
    </>
  );
};

export default ReservationCategoryFeedback;
