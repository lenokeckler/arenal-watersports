import React from "react";
import { FormFieldProps } from "./models/FormFieldProps.interface";
import FieldFactory from "../field-factory/FieldFactory";
import { STRING, INPUT_TYPES } from "@/app/constants";
import { useFormFieldViewModel } from "./hooks/useFormFieldViewModel";
import { FORM_FIELD_VARIANT } from "./constants/FormFieldVariant.constants";
import { FIELD_ERROR_ID_SUFFIX } from "../field-factory/constants/FieldFactory.constants";
import Text from "../text/Text";
import InlineText from "../text/InlineText";
import {
  FORM_FIELD_ERROR_TEXT_CLASSES,
  FORM_FIELD_LABEL_CLASSES,
  FORM_FIELD_LABEL_SUFFIX_CLASS,
  FORM_FIELD_WRAPPER_CLASS,
} from "./styles/FormField.styles";

const FormField = ({
  id,
  name,
  label,
  value,
  type = INPUT_TYPES.TEXT,
  options = [],
  checked = false,
  placeholder = STRING.Empty,
  classNameField = STRING.Empty,
  onChange,
  onKeyDown,
  error,
  showErrorText = false,
  labelSuffix = STRING.ASTERISK,
  readOnly = false,
  disabled = false,
  selectSizeClassName,
  preventEnterSubmit = false,
  onSearch,
  reference,
  isSearch = false,
  variant = FORM_FIELD_VARIANT.DEFAULT,
}: FormFieldProps) => {
  const { computedClassName, handleChange, handleKeyDown } =
    useFormFieldViewModel({
      value: value ?? STRING.Empty,
      type,
      error,
      classNameField,
      onChange,
      readOnly,
      disabled,
      selectSizeClassName,
      preventEnterSubmit,
      variant,
    });

  const handleKeyDownCombined = (
    event: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => {
    if (preventEnterSubmit) {
      handleKeyDown(
        event as React.KeyboardEvent<HTMLInputElement>
      );
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div className={FORM_FIELD_WRAPPER_CLASS}>
      {type !== INPUT_TYPES.CHECKBOX && (
        <label
          htmlFor={id}
          className={FORM_FIELD_LABEL_CLASSES[variant]}
        >
          {label}
          {STRING.SPACE}
          <InlineText
            className={FORM_FIELD_LABEL_SUFFIX_CLASS}
          >
            {labelSuffix}
          </InlineText>
        </label>
      )}
      <FieldFactory
        id={id}
        name={name}
        value={value}
        type={type}
        options={options}
        checked={checked}
        placeholder={placeholder}
        baseClassName={computedClassName}
        handleChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        selectSizeClassName={selectSizeClassName}
        onKeyDown={
          preventEnterSubmit || onKeyDown
            ? handleKeyDownCombined
            : undefined
        }
        onSearch={onSearch}
        reference={reference}
        isSearch={isSearch}
        hasError={Boolean(error)}
        hasErrorText={Boolean(error) && showErrorText}
      />
      {error && showErrorText && (
        <Text
          id={`${id}${FIELD_ERROR_ID_SUFFIX}`}
          className={FORM_FIELD_ERROR_TEXT_CLASSES[variant]}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormField;
