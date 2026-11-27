import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormField from "@/app/components/form-field/FormField";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ARIA_ROLE,
  AUTOCOMPLETE,
  CURRENCY_SYMBOL,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
  TitleVariant,
} from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_FORM_FIELD_ID } from "../constants/TariffFormFieldId.constants";
import { TARIFF_PRICE_FIELDS } from "../constants/TariffPriceField.constants";
import { TARIFF_TYPE_LABEL } from "../constants/TariffTypeLabel.constants";
import { TARIFF_TYPE_SECTION_CONTENT } from "../constants/TariffTypeSectionContent.constants";
import type { TariffTypeSectionProps } from "../models/TariffTypeSectionProps.interface";
import {
  TARIFF_FORM_PRICE_INPUT_CLASS,
  TARIFF_FORM_SECTION_CLASS,
  TARIFF_FORM_SECTION_HEADER_CLASS,
  TARIFF_FORM_SECTION_HELP_CLASS,
  TARIFF_FORM_SECTION_STATUS_CLASS,
  TARIFF_FORM_SECTION_TITLE_CLASS,
} from "../styles/TariffForm.styles";

const TariffTypeSection = ({
  errors,
  state,
  isSubmitting,
  onPriceChange,
  type,
  values,
}: TariffTypeSectionProps): React.JSX.Element => {
  const content = TARIFF_TYPE_SECTION_CONTENT[state];

  return (
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={TARIFF_TYPE_LABEL[type]}
      className={TARIFF_FORM_SECTION_CLASS}
    >
      <div className={TARIFF_FORM_SECTION_HEADER_CLASS}>
        <Title
          variant={TitleVariant.AUXILIAR}
          text={TARIFF_TYPE_LABEL[type]}
          className={TARIFF_FORM_SECTION_TITLE_CLASS}
        />
        <InlineText
          className={
            TARIFF_FORM_SECTION_STATUS_CLASS[state]
          }
        >
          {content.status}
        </InlineText>
      </div>
      {TARIFF_PRICE_FIELDS.map(
        ({ currency, errorKey, label, textKey }) => (
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
            placeholder={content.placeholder}
            classNameField={
              TARIFF_FORM_PRICE_INPUT_CLASS[currency]
            }
            startAdornment={CURRENCY_SYMBOL[currency]}
            endAdornment={TARIFF_CATALOG_COPY.UNIT_PER_HOUR}
          />
        )
      )}
      <Text className={TARIFF_FORM_SECTION_HELP_CLASS}>
        {content.help}
      </Text>
      <FormErrorBanner message={errors[type].required} />
    </div>
  );
};

export default TariffTypeSection;
