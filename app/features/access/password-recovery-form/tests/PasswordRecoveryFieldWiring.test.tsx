import { fireEvent, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import PasswordRecoveryPinField from "../components/PasswordRecoveryPinField";
import PasswordRecoveryUsernameField from "../components/PasswordRecoveryUsernameField";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  CHANGED_VALUE,
  DESCRIBED_BY_ATTRIBUTE,
  USERNAME_ERROR_MESSAGE,
} from "./passwordRecoveryScreen.constants";
import { renderPasswordRecoveryField } from "./renderPasswordRecoveryField";

describe("PasswordRecoveryUsernameField wiring", () => {
  it("reports typing to the change handler", () => {
    const onChange = vi.fn();
    renderPasswordRecoveryField(
      PasswordRecoveryUsernameField,
      { onChange }
    );

    fireEvent.change(
      screen.getByLabelText(
        PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL
      ),
      { target: { value: CHANGED_VALUE } }
    );

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("hands the input to the focus ref", () => {
    const inputRef = createRef<HTMLInputElement>();
    renderPasswordRecoveryField(
      PasswordRecoveryUsernameField,
      { inputRef }
    );

    expect(inputRef.current).toBe(
      screen.getByLabelText(
        PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL
      )
    );
  });

  it("shows the error and describes the input with it", () => {
    renderPasswordRecoveryField(
      PasswordRecoveryUsernameField,
      { error: USERNAME_ERROR_MESSAGE }
    );

    expect(
      screen.getByText(USERNAME_ERROR_MESSAGE)
    ).toBeVisible();
    expect(
      screen.getByLabelText(
        PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL
      )
    ).toHaveAttribute(
      DESCRIBED_BY_ATTRIBUTE,
      `${PASSWORD_RECOVERY_FIELD.USERNAME}${FIELD_ERROR_ID_SUFFIX}`
    );
  });
});

describe("PasswordRecoveryPinField wiring", () => {
  it("reports typing to the change handler", () => {
    const onChange = vi.fn();
    renderPasswordRecoveryField(PasswordRecoveryPinField, {
      onChange,
    });

    fireEvent.change(
      screen.getByLabelText(
        PASSWORD_RECOVERY_RESET_COPY.PIN_LABEL
      ),
      { target: { value: CHANGED_VALUE } }
    );

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("hands the input to the focus ref", () => {
    const inputRef = createRef<HTMLInputElement>();
    renderPasswordRecoveryField(PasswordRecoveryPinField, {
      inputRef,
    });

    expect(inputRef.current).toBe(
      screen.getByLabelText(
        PASSWORD_RECOVERY_RESET_COPY.PIN_LABEL
      )
    );
  });
});
