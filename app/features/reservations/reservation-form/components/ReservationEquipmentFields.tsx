import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_EQUIPMENT_NOTE_CLASS } from "../styles/ReservationFormView.styles";
import Text from "@/app/components/text/Text";
import ReservationCategoryField from "./ReservationCategoryField";
import ReservationQuantityField from "./ReservationQuantityField";
import ReservationUnitField from "./ReservationUnitField";
import ReservationCategoryAvailabilityPanel from "./ReservationCategoryAvailabilityPanel";
import ReservationCategoryConflictWarning from "./ReservationCategoryConflictWarning";

const ReservationEquipmentFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <>
    <ReservationCategoryField
      categories={categories}
      viewModel={viewModel}
    />
    {viewModel.requiresConcreteUnit ? (
      <ReservationUnitField viewModel={viewModel} />
    ) : (
      <ReservationQuantityField viewModel={viewModel} />
    )}
    <Text className={RESERVATION_FORM_EQUIPMENT_NOTE_CLASS}>
      {viewModel.requiresConcreteUnit
        ? RESERVATION_FORM_UI_COPY.EQUIPMENT_UNIT_NOTE
        : RESERVATION_FORM_UI_COPY.EQUIPMENT_QUANTITY_NOTE}
    </Text>
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
  </>
);

export default ReservationEquipmentFields;
