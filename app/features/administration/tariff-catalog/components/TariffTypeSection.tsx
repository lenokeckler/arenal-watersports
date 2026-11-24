import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
  TitleVariant,
} from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_FORM_FIELD_ID } from "../constants/TariffFormFieldId.constants";
import { TARIFF_PRICE_FIELDS } from "../constants/TariffPriceField.constants";
import { TARIFF_TYPE_LABEL } from "../constants/TariffTypeLabel.constants";
import type { TariffTypeSectionProps } from "../models/TariffTypeSectionProps.interface";
import {
  TARIFF_FORM_SECTION_CLASS,
  TARIFF_FORM_SECTION_UNIT_CLASS,
} from "../styles/TariffForm.styles";

const TariffTypeSection = ({
  errors,
  isSubmitting,
  onPriceChange,
  type,
  values,
}: TariffTypeSectionProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={TARIFF_TYPE_LABEL[type]}
    className={TARIFF_FORM_SECTION_CLASS}
  >
    <Title
      variant={TitleVariant.AUXILIAR}
      text={TARIFF_TYPE_LABEL[type]}
    />
    <Text className={TARIFF_FORM_SECTION_UNIT_CLASS}>
      {TARIFF_CATALOG_COPY.UNIT_PER_HOUR}
    </Text>
    {TARIFF_PRICE_FIELDS.map(
      ({ errorKey, label, textKey }) => (
        <FormField
          key={textKey}
          id={TARIFF_FORM_FIELD_ID[type][textKey]}
          name={TARIFF_FORM_FIELD_ID[type][textKey]}
          label={label}
          type={INPUT_TYPES.TEXT}
          value={values[type][textKey]}
          onChange={onPriceChange(type, textKey)}
          error={errors[type][errorKey]}
          showErrorText
          disabled={isSubmitting}
          autoComplete={AUTOCOMPLETE.OFF}
          inputMode={INPUT_MODE.DECIMAL}
          labelSuffix={STRING.Empty}
          spellCheck={false}
        />
      )
    )}
    <FormErrorBanner message={errors[type].required} />
  </div>
);

export default TariffTypeSection;
