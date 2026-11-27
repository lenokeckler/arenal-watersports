import { CURRENCY_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import { TARIFF_FORM_TYPE_ORDER } from "../constants/TariffFormTypeOrder.constants";
import type { TariffAmounts } from "../models/TariffAmounts.interface";
import type { TariffForEdit } from "../models/TariffForEdit.type";
import type { TariffFormErrors } from "../models/TariffFormErrors.interface";
import type { TariffFormValues } from "../models/TariffFormValues.interface";
import type { TariffTypeFormErrors } from "../models/TariffTypeFormErrors.interface";
import type { TariffTypeFormValues } from "../models/TariffTypeFormValues.interface";
import { isTariffTypeFormBlank } from "./isTariffTypeFormBlank";
import { validateTariffPriceText } from "./validateTariffPriceText";

const validateTypeValues = (
  values: TariffTypeFormValues,
  existingAmounts: NullableRef<TariffAmounts>
): TariffTypeFormErrors => {
  const usdError = validateTariffPriceText(
    values.usdText,
    CURRENCY_CODE.USD
  );
  const crcError = validateTariffPriceText(
    values.crcText,
    CURRENCY_CODE.CRC
  );
  const isMissingRequiredPrice =
    Boolean(existingAmounts) &&
    isTariffTypeFormBlank(values);

  return {
    ...(usdError ? { usd: usdError } : {}),
    ...(crcError ? { crc: crcError } : {}),
    ...(isMissingRequiredPrice
      ? {
          required:
            TARIFF_FORM_COPY.TYPE_PRICE_REQUIRED_ERROR,
        }
      : {}),
  };
};

export const validateTariffFormValues = (
  values: TariffFormValues,
  existing: TariffForEdit
): TariffFormErrors => {
  const rental = validateTypeValues(
    values.rental,
    existing.rental
  );
  const tour = validateTypeValues(
    values.tour,
    existing.tour
  );
  const typeErrorCount =
    Object.keys(rental).length + Object.keys(tour).length;
  const hasNoPrice = TARIFF_FORM_TYPE_ORDER.every((type) =>
    isTariffTypeFormBlank(values[type])
  );
  const formError =
    hasNoPrice && typeErrorCount === 0
      ? TARIFF_FORM_COPY.NO_PRICE_ERROR
      : undefined;

  return {
    count: typeErrorCount + (formError ? 1 : 0),
    ...(formError ? { form: formError } : {}),
    rental,
    tour,
  };
};
