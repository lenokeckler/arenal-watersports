import FormField from "@/app/components/form-field/FormField";
import {
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  INVENTORY_COUNT_FIELD_ID,
  INVENTORY_COUNT_QUANTITY_FIELD,
} from "../constants/InventoryCount.constants";
import {
  INVENTORY_COUNT_QUANTITY_ERROR,
  INVENTORY_COUNT_QUANTITY_LABEL,
} from "../constants/InventoryCountCopy.constants";
import type { InventoryCountQuantityFieldsProps } from "../models/InventoryCountQuantityFieldsProps.interface";
import { INVENTORY_COUNT_QUANTITY_GRID_CLASS } from "../styles/InventoryCount.styles";

const FIELDS = Object.values(
  INVENTORY_COUNT_QUANTITY_FIELD
);

const InventoryCountQuantityFields = ({
  categoryId,
  form,
  hasError,
}: InventoryCountQuantityFieldsProps): React.JSX.Element => (
  <div className={INVENTORY_COUNT_QUANTITY_GRID_CLASS}>
    {FIELDS.map((field) => (
      <FormField
        key={field}
        id={INVENTORY_COUNT_FIELD_ID.QUANTITY(
          categoryId,
          field
        )}
        name={INVENTORY_COUNT_FIELD_ID.QUANTITY(
          categoryId,
          field
        )}
        label={INVENTORY_COUNT_QUANTITY_LABEL[field]}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.NUMERIC}
        value={
          form.draft.quantities[categoryId]?.[field] ??
          STRING.Empty
        }
        error={
          hasError
            ? INVENTORY_COUNT_QUANTITY_ERROR
            : undefined
        }
        showErrorText
        onChange={form.handleQuantityChange(
          categoryId,
          field
        )}
      />
    ))}
  </div>
);

export default InventoryCountQuantityFields;
