import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormField from "@/app/components/form-field/FormField";
import { AUTOCOMPLETE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import type { ExtraFormFieldsProps } from "../models/ExtraFormFieldsProps.type";
import ExtraOccupancySection from "./ExtraOccupancySection";
import ExtraPriceField from "./ExtraPriceField";

const ExtraFormFields = ({
  values,
  errors,
  isSubmitting,
  onNameChange,
  onPriceUsdChange,
  isOccupancyEnabled,
  isOccupancyDisabled,
  isOccupancyLocked,
  hasOccupiableCategories,
  occupancyCategoryOptions,
  onPriceCrcChange,
  onOccupancyToggle,
  onOccupiesCategoryChange,
  onOccupiesQuantityChange,
}: ExtraFormFieldsProps): React.JSX.Element => (
  <>
    <FormField
      id={EXTRA_FORM_FIELD_ID.NAME}
      name={EXTRA_FORM_FIELD_ID.NAME}
      label={EXTRA_CATALOG_COPY.NAME_LABEL}
      value={values.name}
      onChange={onNameChange}
      error={errors.name}
      showErrorText
      disabled={isSubmitting}
      autoComplete={AUTOCOMPLETE.OFF}
      describedBy={EXTRA_FORM_FIELD_ID.HINT}
    />
    <ExtraPriceField
      id={EXTRA_FORM_FIELD_ID.PRICE_USD}
      label={EXTRA_CATALOG_COPY.PRICE_USD_LABEL}
      value={values.priceUsd}
      error={errors.priceUsd}
      disabled={isSubmitting}
      onChange={onPriceUsdChange}
    />
    <ExtraPriceField
      id={EXTRA_FORM_FIELD_ID.PRICE_CRC}
      label={EXTRA_CATALOG_COPY.PRICE_CRC_LABEL}
      value={values.priceCrc}
      error={errors.priceCrc}
      disabled={isSubmitting}
      onChange={onPriceCrcChange}
    />
    <FormErrorBanner message={errors.prices} />
    <ExtraOccupancySection
      values={values}
      errors={errors}
      isOccupancyEnabled={isOccupancyEnabled}
      isOccupancyDisabled={isOccupancyDisabled}
      isOccupancyLocked={isOccupancyLocked}
      hasOccupiableCategories={hasOccupiableCategories}
      occupancyCategoryOptions={occupancyCategoryOptions}
      onOccupancyToggle={onOccupancyToggle}
      onOccupiesCategoryChange={onOccupiesCategoryChange}
      onOccupiesQuantityChange={onOccupiesQuantityChange}
    />
  </>
);

export default ExtraFormFields;
