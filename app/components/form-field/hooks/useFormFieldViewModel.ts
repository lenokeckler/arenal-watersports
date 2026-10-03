import {
  STRING,
  INPUT_TYPES,
  KEYBOARD,
} from "@/app/constants";
import React from "react";
import { FORM_FIELD_VARIANT } from "../constants/FormFieldVariant.constants";
import { FormFieldViewModel } from "../models/FormFieldViewModel.interface";
import { resolveFormFieldInputClassName } from "../styles/FormField.styles";

export const useFormFieldViewModel = ({
  value,
  type = INPUT_TYPES.TEXT,
  error,
  classNameField = STRING.Empty,
  onChange,
  readOnly = false,
  disabled = false,
  preventEnterSubmit = false,
  variant = FORM_FIELD_VARIANT.DEFAULT,
}: FormFieldViewModel & {
  readOnly?: boolean;
  disabled?: boolean;
  selectSizeClassName?: string;
}) => {
  const isValidDate = (dateString: string) => {
    if (!dateString) {
      return false;
    }
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const computedClassName = resolveFormFieldInputClassName({
    classNameField,
    hasError: Boolean(error),
    isPlaceholderValue:
      type === INPUT_TYPES.DATE && !isValidDate(value),
    isInteractive: !readOnly && !disabled,
    readOnly,
    disabled,
    variant,
  });

  const handleChange = (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => {
    if (!readOnly && !disabled) {
      onChange(event);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      preventEnterSubmit &&
      event.key === KEYBOARD.ENTER
    ) {
      event.preventDefault();
    }
  };

  return {
    computedClassName,
    handleChange,
    handleKeyDown,
  };
};
