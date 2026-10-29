import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_EQUIPMENT_NOTE_CLASS } from "../styles/ReservationFormView.styles";
import Text from "@/app/components/text/Text";
import ReservationCategoryField from "./ReservationCategoryField";
import ReservationQuantityField from "./ReservationQuantityField";
import ReservationUnitField from "./ReservationUnitField";

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
    {!viewModel.requiresConcreteUnit &&
      viewModel.availableQuantity !== null && (
        <Text
          className={RESERVATION_FORM_EQUIPMENT_NOTE_CLASS}
        >
          {RESERVATION_FORM_UI_COPY.AVAILABLE_QUANTITY}{" "}
          {viewModel.availableQuantity}
        </Text>
      )}
  </>
);

export default ReservationEquipmentFields;
