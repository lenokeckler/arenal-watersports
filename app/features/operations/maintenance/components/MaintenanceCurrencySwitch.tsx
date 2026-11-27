import LinkSwitch from "@/app/components/link-switch/LinkSwitch";
import {
  EQUIPMENT_CURRENCIES,
  EQUIPMENT_CURRENCY_LABELS,
} from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceCurrencySwitchProps } from "../models/MaintenanceCurrencySwitchProps.type";
import { buildMaintenanceHref } from "../utils/buildMaintenanceHref";
import type { JSX } from "react";

const MaintenanceCurrencySwitch = ({
  filters,
}: MaintenanceCurrencySwitchProps): JSX.Element => (
  <LinkSwitch
    label={MAINTENANCE_COPY.CURRENCY_LABEL}
    options={EQUIPMENT_CURRENCIES.map((code) => ({
      href: buildMaintenanceHref(filters, {
        currency: code,
      }),
      isCurrent: code === filters.currency,
      key: code,
      label: EQUIPMENT_CURRENCY_LABELS[code],
    }))}
  />
);

export default MaintenanceCurrencySwitch;
