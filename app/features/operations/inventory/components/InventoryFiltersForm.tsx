import {
  INVENTORY_TRACKING_MODE,
  PATHS,
} from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import {
  INVENTORY_FILTER_LIMITS,
  INVENTORY_FILTER_PARAM,
} from "../constants/InventoryFilters.constants";
import type { InventoryFiltersFormProps } from "../models/InventoryFiltersFormProps.interface";
import {
  INVENTORY_FILTER_CONTROL_CLASS,
  INVENTORY_FILTER_FIELD_CLASS,
  INVENTORY_FILTER_SUBMIT_CLASS,
  INVENTORY_FILTERS_CLASS,
} from "../styles/InventoryOverview.styles";

const InventoryFiltersForm = ({
  filters,
}: InventoryFiltersFormProps): React.JSX.Element => (
  <form
    method="get"
    action={PATHS.OPERATIONS.INVENTORY}
    role="search"
    aria-label={INVENTORY_COPY.FILTERS_LABEL}
    className={INVENTORY_FILTERS_CLASS}
  >
    <label className={INVENTORY_FILTER_FIELD_CLASS}>
      {INVENTORY_COPY.FILTER_QUERY_LABEL}
      <input
        type="search"
        name={INVENTORY_FILTER_PARAM.QUERY}
        defaultValue={filters.query}
        maxLength={INVENTORY_FILTER_LIMITS.QUERY_MAX_LENGTH}
        placeholder={
          INVENTORY_COPY.FILTER_QUERY_PLACEHOLDER
        }
        className={INVENTORY_FILTER_CONTROL_CLASS}
      />
    </label>
    <label className={INVENTORY_FILTER_FIELD_CLASS}>
      {INVENTORY_COPY.FILTER_MODE_LABEL}
      <select
        name={INVENTORY_FILTER_PARAM.MODE}
        defaultValue={filters.mode}
        className={INVENTORY_FILTER_CONTROL_CLASS}
      >
        <option value="">
          {INVENTORY_COPY.FILTER_ALL_MODES}
        </option>
        <option value={INVENTORY_TRACKING_MODE.BY_UNIT}>
          {INVENTORY_COPY.UNIT_TRACKING}
        </option>
        <option value={INVENTORY_TRACKING_MODE.BY_QUANTITY}>
          {INVENTORY_COPY.QUANTITY_TRACKING}
        </option>
      </select>
    </label>
    <button
      type="submit"
      className={INVENTORY_FILTER_SUBMIT_CLASS}
    >
      {INVENTORY_COPY.FILTER_SUBMIT}
    </button>
  </form>
);

export default InventoryFiltersForm;
