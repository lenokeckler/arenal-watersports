import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormField from "@/app/components/form-field/FormField";
import Title from "@/app/components/title/Title";
import Text from "@/app/components/text/Text";
import {
  AUTOCOMPLETE,
  CURRENCY_CODE,
  CURRENCY_SYMBOL,
  STRING,
  TitleVariant,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import type { ExtraFormFieldsProps } from "../models/ExtraFormFieldsProps.type";
import {
  EXTRA_FORM_GROUP_CLASS,
  EXTRA_FORM_GROUP_TITLE_CLASS,
  EXTRA_FORM_HELP_CLASS,
  EXTRA_FORM_NAME_GROUP_CLASS,
  EXTRA_FORM_PRICE_FIELDS_CLASS,
} from "../styles/ExtraForm.styles";
import ExtraFormBoats from "./ExtraFormBoats";
import ExtraOccupancySection from "./ExtraOccupancySection";
import ExtraPriceField from "./ExtraPriceField";

const ExtraFormFields = ({
  values,
  errors,
  isSubmitting,
  compatibilityHref,
  onNameChange,
  onPriceUsdChange,
  onPriceCrcChange,
  ...occupancyProps
}: ExtraFormFieldsProps): React.JSX.Element => (
  <>
    <div className={EXTRA_FORM_NAME_GROUP_CLASS}>
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
        labelSuffix={STRING.Empty}
      />
      <Text
        id={EXTRA_FORM_FIELD_ID.HINT}
        className={EXTRA_FORM_HELP_CLASS}
      >
        {EXTRA_CATALOG_COPY.NAME_HELP}
      </Text>
    </div>
    <div className={EXTRA_FORM_GROUP_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={EXTRA_CATALOG_COPY.PRICE_GROUP_TITLE}
        className={EXTRA_FORM_GROUP_TITLE_CLASS}
      />
      <div className={EXTRA_FORM_PRICE_FIELDS_CLASS}>
        <ExtraPriceField
          id={EXTRA_FORM_FIELD_ID.PRICE_USD}
          label={EXTRA_CATALOG_COPY.PRICE_USD_LABEL}
          symbol={CURRENCY_SYMBOL[CURRENCY_CODE.USD]}
          currency={CURRENCY_CODE.USD}
          value={values.priceUsd}
          error={errors.priceUsd}
          disabled={isSubmitting}
          onChange={onPriceUsdChange}
        />
        <ExtraPriceField
          id={EXTRA_FORM_FIELD_ID.PRICE_CRC}
          label={EXTRA_CATALOG_COPY.PRICE_CRC_LABEL}
          symbol={CURRENCY_SYMBOL[CURRENCY_CODE.CRC]}
          currency={CURRENCY_CODE.CRC}
          value={values.priceCrc}
          error={errors.priceCrc}
          disabled={isSubmitting}
          onChange={onPriceCrcChange}
        />
      </div>
      <Text className={EXTRA_FORM_HELP_CLASS}>
        {EXTRA_CATALOG_COPY.PRICE_GROUP_HELP}
      </Text>
      <FormErrorBanner message={errors.prices} />
    </div>
    <ExtraOccupancySection
      values={values}
      errors={errors}
      {...occupancyProps}
    />
    <ExtraFormBoats compatibilityHref={compatibilityHref} />
  </>
);

export default ExtraFormFields;
