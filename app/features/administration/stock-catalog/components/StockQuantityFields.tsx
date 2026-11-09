import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import { STOCK_QUANTITY_FIELD } from "../constants/StockQuantityField.constants";
import type { StockQuantityFieldsProps } from "../models/StockQuantityFieldsProps.interface";
import { STOCK_COUNT_QUANTITY_GRID_CLASS } from "../styles/StockCount.styles";
import StockQuantityBlock from "./StockQuantityBlock";

const StockQuantityFields = ({
  changes,
  disabled,
  errors,
  handlers,
  values,
}: StockQuantityFieldsProps): React.JSX.Element => (
  <div className={STOCK_COUNT_QUANTITY_GRID_CLASS}>
    <StockQuantityBlock
      field={STOCK_QUANTITY_FIELD.AVAILABLE}
      id={STOCK_COUNT_FIELD_ID.AVAILABLE}
      label={STOCK_COUNT_COPY.AVAILABLE_LABEL}
      value={values.available}
      error={errors.available}
      changeText={changes.available}
      disabled={disabled}
      onChange={handlers.onAvailableChange}
      onQuantityStep={handlers.onQuantityStep}
    />
    <StockQuantityBlock
      field={STOCK_QUANTITY_FIELD.DAMAGED}
      id={STOCK_COUNT_FIELD_ID.DAMAGED}
      label={STOCK_COUNT_COPY.DAMAGED_LABEL}
      value={values.damaged}
      error={errors.damaged}
      changeText={changes.damaged}
      disabled={disabled}
      onChange={handlers.onDamagedChange}
      onQuantityStep={handlers.onQuantityStep}
    />
    <StockQuantityBlock
      field={STOCK_QUANTITY_FIELD.IN_REPAIR}
      id={STOCK_COUNT_FIELD_ID.IN_REPAIR}
      label={STOCK_COUNT_COPY.IN_REPAIR_LABEL}
      value={values.inRepair}
      error={errors.inRepair}
      changeText={changes.inRepair}
      disabled={disabled}
      onChange={handlers.onInRepairChange}
      onQuantityStep={handlers.onQuantityStep}
    />
  </div>
);

export default StockQuantityFields;
