import Button from "@/app/components/button/Button";
import {
  ARIA_ROLE,
  BUTTON,
  BUTTON_TYPES,
} from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import type { TariffListFiltersProps } from "../models/TariffListFiltersProps.interface";
import {
  TARIFF_LIST_FILTERS_CLASS,
  resolveTariffListFilterClassName,
} from "../styles/TariffList.styles";

const TariffListFilters = ({
  options,
  onSelect,
}: TariffListFiltersProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={TARIFF_CATALOG_COPY.FILTER_GROUP_LABEL}
    className={TARIFF_LIST_FILTERS_CLASS}
  >
    {options.map(({ filter, isSelected, label }) => (
      <Button
        key={filter}
        type={BUTTON_TYPES.BUTTON}
        variant={BUTTON.BASE}
        aria-pressed={isSelected}
        className={resolveTariffListFilterClassName(
          isSelected
        )}
        onClick={() => onSelect(filter)}
      >
        {label}
      </Button>
    ))}
  </div>
);

export default TariffListFilters;
