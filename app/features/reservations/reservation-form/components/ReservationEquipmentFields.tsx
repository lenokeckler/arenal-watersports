import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { ARIA_ROLE } from "@/app/constants";
import Text from "@/app/components/text/Text";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_WIDE_CLASS } from "../styles/ReservationFormView.styles";
import { RESERVATION_FORM_STATUS_CLASS } from "../styles/ReservationFormView.styles";
import ReservationCategoryAvailabilityPanel from "./ReservationCategoryAvailabilityPanel";
import ReservationCategoryConflictWarning from "./ReservationCategoryConflictWarning";
import { ReservationEquipmentCategoryFields } from "./ReservationEquipmentCategoryFields";
import ReservationQuantityField from "./ReservationQuantityField";
import ReservationUnitField from "./ReservationUnitField";

const ReservationEquipmentFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_FIELD_WIDE_CLASS}>
    {viewModel.hasReservationTypeSelectionReset && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_STATUS_CLASS}
      >
        {
          RESERVATION_FORM_UI_COPY.RESERVATION_TYPE_SELECTION_CLEARED
        }
      </Text>
    )}
    <ReservationEquipmentCategoryFields
      categories={categories}
      viewModel={viewModel}
    />
    {viewModel.requiresConcreteUnit ? (
      <ReservationUnitField viewModel={viewModel} />
    ) : (
      <ReservationQuantityField viewModel={viewModel} />
    )}
    <ReservationCategoryAvailabilityPanel
      categoryName={
        viewModel.categoryAvailabilityCategoryName
      }
      freeEquipmentCount={viewModel.categoryAvailability}
      intervalLabel={viewModel.categoryAvailabilityInterval}
      onRetry={viewModel.handleRetryCategoryAvailability}
      state={viewModel.categoryAvailabilityState}
    />
    <ReservationCategoryConflictWarning
      viewModel={viewModel.categoryConflictWarning}
    />
  </div>
);

export default ReservationEquipmentFields;
