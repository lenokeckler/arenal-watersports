import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormField from "@/app/components/form-field/FormField";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { COMBO_FORM_FIELD_ID } from "../constants/ComboFormFieldId.constants";
import type { ComboFormViewModel } from "../models/ComboFormViewModel.interface";
import ComboAudienceChooser from "./ComboAudienceChooser";
import ComboItemsEditor from "./ComboItemsEditor";

const ComboFormFields = (
  viewModel: ComboFormViewModel
): React.JSX.Element => {
  const {
    errors,
    isAudienceLocked,
    isSubmitting,
    onAudienceSelect,
    onNameChange,
    onPriceChange,
    priceField,
    submitError,
    values,
  } = viewModel;

  return (
    <>
      <FormField
        id={COMBO_FORM_FIELD_ID.NAME}
        name={COMBO_FORM_FIELD_ID.NAME}
        label={COMBO_FORM_COPY.NAME_LABEL}
        value={values.name}
        onChange={onNameChange}
        error={errors.name}
        showErrorText
        disabled={isSubmitting}
        autoComplete={AUTOCOMPLETE.OFF}
        describedBy={COMBO_FORM_FIELD_ID.HINT}
      />
      <ComboAudienceChooser
        audience={values.audience}
        isDisabled={isSubmitting}
        isLocked={isAudienceLocked}
        onSelect={onAudienceSelect}
      />
      <FormField
        id={COMBO_FORM_FIELD_ID.PRICE}
        name={COMBO_FORM_FIELD_ID.PRICE}
        label={priceField.label}
        placeholder={priceField.placeholder}
        type={INPUT_TYPES.TEXT}
        value={values.priceText}
        onChange={onPriceChange}
        error={errors.price}
        showErrorText
        disabled={isSubmitting}
        autoComplete={AUTOCOMPLETE.OFF}
        inputMode={INPUT_MODE.DECIMAL}
        labelSuffix={STRING.Empty}
        spellCheck={false}
      />
      <ComboItemsEditor {...viewModel} />
      <FormErrorBanner message={submitError} />
    </>
  );
};

export default ComboFormFields;
