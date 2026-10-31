import { Text } from "@/app/components";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormFieldsProps } from "../models/ReservationFormFieldsProps.interface";
import {
  RESERVATION_FORM_EQUIPMENT_NOTE_CLASS,
  RESERVATION_FORM_FIELD_WIDE_CLASS,
} from "../styles/ReservationFormView.styles";
import { ReservationEquipmentCategoryFields } from "./ReservationEquipmentCategoryFields";
import ReservationQuantityField from "./ReservationQuantityField";
import ReservationUnitField from "./ReservationUnitField";

const ReservationEquipmentFields = ({
  categories,
  viewModel,
}: ReservationFormFieldsProps): React.JSX.Element => (
  <div className={RESERVATION_FORM_FIELD_WIDE_CLASS}>
    <ReservationEquipmentCategoryFields
      categories={categories}
      viewModel={viewModel}
    />
    {viewModel.requiresConcreteUnit ? (
      <ReservationUnitField viewModel={viewModel} />
    ) : (
      <ReservationQuantityField viewModel={viewModel} />
    )}
    <Text className={RESERVATION_FORM_EQUIPMENT_NOTE_CLASS}>
      {RESERVATION_FORM_UI_COPY.EQUIPMENT_NOTE}
    </Text>
  </div>
);

export default ReservationEquipmentFields;
