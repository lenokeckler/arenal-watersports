"use client";

import { Text } from "@/app/components";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  FORM_FIELD_GLASS_ERROR_TEXT_CLASS,
  FORM_FIELD_GLASS_LABEL_CLASS,
} from "@/app/components/form-field/styles/FormField.styles";
import {
  FORM_GROUP_CLASS,
  FORM_HINT_CLASS,
} from "@/app/components/form-layout/styles/FormLayout.styles";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { PASSWORD_RECOVERY_PIN_HINT_ID } from "../constants/PasswordRecoveryFieldIds.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import { useIsHydrated } from "../hooks/useIsHydrated";
import type { PasswordRecoveryFieldProps } from "../models/PasswordRecoveryFieldProps.interface";
import {
  PASSWORD_RECOVERY_PIN_FRAME_CLASS,
  resolvePasswordRecoveryPinInputClassName,
} from "../styles/PasswordRecoveryForm.styles";
import PasswordRecoveryPinBoxes from "./PasswordRecoveryPinBoxes";

const PIN_ERROR_ID = `${PASSWORD_RECOVERY_FIELD.PIN}${FIELD_ERROR_ID_SUFFIX}`;

const PasswordRecoveryPinField = ({
  error,
  inputRef,
  isPending,
  onChange,
  value,
}: PasswordRecoveryFieldProps): React.JSX.Element => {
  const showsBoxes = useIsHydrated();
  const hasError = Boolean(error);

  return (
    <div className={FORM_GROUP_CLASS}>
      <label
        htmlFor={PASSWORD_RECOVERY_FIELD.PIN}
        className={FORM_FIELD_GLASS_LABEL_CLASS}
      >
        {PASSWORD_RECOVERY_RESET_COPY.PIN_LABEL}
      </label>
      <div className={PASSWORD_RECOVERY_PIN_FRAME_CLASS}>
        <input
          ref={inputRef}
          id={PASSWORD_RECOVERY_FIELD.PIN}
          name={PASSWORD_RECOVERY_FIELD.PIN}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.NUMERIC}
          autoComplete={AUTOCOMPLETE.ONE_TIME_CODE}
          autoCapitalize={AUTOCAPITALIZE.NONE}
          spellCheck={false}
          value={value}
          onChange={onChange}
          readOnly={isPending}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${PIN_ERROR_ID}${STRING.SPACE}${PASSWORD_RECOVERY_PIN_HINT_ID}`
              : PASSWORD_RECOVERY_PIN_HINT_ID
          }
          className={resolvePasswordRecoveryPinInputClassName(
            showsBoxes,
            hasError
          )}
        />
        {showsBoxes && (
          <PasswordRecoveryPinBoxes
            hasError={hasError}
            value={value}
          />
        )}
      </div>
      <Text
        id={PASSWORD_RECOVERY_PIN_HINT_ID}
        className={FORM_HINT_CLASS}
      >
        {PASSWORD_RECOVERY_RESET_COPY.PIN_HINT}
      </Text>
      {hasError && (
        <Text
          id={PIN_ERROR_ID}
          className={FORM_FIELD_GLASS_ERROR_TEXT_CLASS}
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default PasswordRecoveryPinField;
