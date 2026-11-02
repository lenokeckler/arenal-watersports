import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import type { StockQuantityFieldsProps } from "../models/StockQuantityFieldsProps.interface";
import { STOCK_COUNT_QUANTITY_GRID_CLASS } from "../styles/StockCount.styles";
import StockNumberField from "./StockNumberField";

const StockQuantityFields = ({
  disabled,
  errors,
  handlers,
  values,
}: StockQuantityFieldsProps): React.JSX.Element => (
  <div className={STOCK_COUNT_QUANTITY_GRID_CLASS}>
    <StockNumberField
      id={STOCK_COUNT_FIELD_ID.AVAILABLE}
      label={STOCK_COUNT_COPY.AVAILABLE_LABEL}
      value={values.available}
      error={errors.available}
      disabled={disabled}
      onChange={handlers.onAvailableChange}
    />
    <StockNumberField
      id={STOCK_COUNT_FIELD_ID.DAMAGED}
      label={STOCK_COUNT_COPY.DAMAGED_LABEL}
      value={values.damaged}
      error={errors.damaged}
      disabled={disabled}
      onChange={handlers.onDamagedChange}
    />
    <StockNumberField
      id={STOCK_COUNT_FIELD_ID.IN_REPAIR}
      label={STOCK_COUNT_COPY.IN_REPAIR_LABEL}
      value={values.inRepair}
      error={errors.inRepair}
      disabled={disabled}
      onChange={handlers.onInRepairChange}
    />
  </div>
);

export default StockQuantityFields;
