import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import { TARIFF_FORM_TYPE_ORDER } from "../constants/TariffFormTypeOrder.constants";
import type { TariffFormViewModel } from "../models/TariffFormViewModel.interface";
import TariffTypeSection from "./TariffTypeSection";

const TariffFormFields = ({
  bannerMessage,
  errors,
  isSubmitting,
  onPriceChange,
  values,
}: TariffFormViewModel): React.JSX.Element => (
  <>
    {TARIFF_FORM_TYPE_ORDER.map((type) => (
      <TariffTypeSection
        key={type}
        errors={errors}
        isSubmitting={isSubmitting}
        onPriceChange={onPriceChange}
        type={type}
        values={values}
      />
    ))}
    <FormErrorBanner message={bannerMessage} />
  </>
);

export default TariffFormFields;
