import { screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  PASSWORD_RECOVERY_FIELD,
  PASSWORD_RESET_PIN,
  STRING,
} from "@/app/constants";
import PasswordRecoveryPinField from "../components/PasswordRecoveryPinField";
import { PASSWORD_RECOVERY_PIN_HINT_ID } from "../constants/PasswordRecoveryFieldIds.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import {
  PASSWORD_RECOVERY_PIN_BOXES_INPUT_CLASS,
  PASSWORD_RECOVERY_PIN_INPUT_CLASS,
} from "../styles/PasswordRecoveryForm.styles";
import {
  AUTOCAPITALIZE_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  DESCRIBED_BY_ATTRIBUTE,
  FALSE_VALUE,
  FIELD_ERROR_MESSAGE,
  ID_ATTRIBUTE,
  INPUT_MODE_ATTRIBUTE,
  MAX_LENGTH_ATTRIBUTE,
  NAME_ATTRIBUTE,
  PLACEHOLDER_PROPERTY,
  READONLY_PROPERTY,
  SPELLCHECK_ATTRIBUTE,
  TYPE_ATTRIBUTE,
  TYPED_PIN,
} from "./passwordRecoveryScreen.constants";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  PIN_BOXES_TEST_ID,
  PIN_BOXES_TEST_ID_ATTRIBUTE,
  PIN_INPUT_SELECTOR,
  TRUE_VALUE,
} from "./passwordRecoveryPinBoxes.constants";
import { renderPasswordRecoveryField } from "./renderPasswordRecoveryField";

const getInput = (): HTMLInputElement =>
  screen.getByLabelText<HTMLInputElement>(
    PASSWORD_RECOVERY_RESET_COPY.PIN_LABEL
  );

const renderPinField = (
  overrides: Parameters<
    typeof renderPasswordRecoveryField
  >[1] = {}
): void => {
  renderPasswordRecoveryField(PasswordRecoveryPinField, {
    value: TYPED_PIN,
    ...overrides,
  });
};

describe("PasswordRecoveryPinField", () => {
  it("names the field with the recovery pin field", () => {
    renderPinField();

    expect(getInput()).toHaveAttribute(
      ID_ATTRIBUTE,
      PASSWORD_RECOVERY_FIELD.PIN
    );
    expect(getInput()).toHaveAttribute(
      NAME_ATTRIBUTE,
      PASSWORD_RECOVERY_FIELD.PIN
    );
  });

  it("asks the phone for the numeric pad and the one-time code", () => {
    renderPinField();

    expect(getInput()).toHaveAttribute(
      INPUT_MODE_ATTRIBUTE,
      INPUT_MODE.NUMERIC
    );
    expect(getInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.ONE_TIME_CODE
    );
    expect(getInput()).toHaveAttribute(
      AUTOCAPITALIZE_ATTRIBUTE,
      AUTOCAPITALIZE.NONE
    );
    expect(getInput()).toHaveAttribute(
      SPELLCHECK_ATTRIBUTE,
      FALSE_VALUE
    );
  });

  it("shows the digits in plain text without a length cap or placeholder", () => {
    renderPinField();

    expect(getInput()).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.TEXT
    );
    expect(getInput()).not.toHaveAttribute(
      MAX_LENGTH_ATTRIBUTE
    );
    expect(getInput()).toHaveValue(TYPED_PIN);
    expect(getInput()).toHaveProperty(
      PLACEHOLDER_PROPERTY,
      STRING.Empty
    );
  });

  it("shows one box per digit once the page is interactive, hidden from screen readers", () => {
    renderPinField();

    const boxes = screen.getByTestId(PIN_BOXES_TEST_ID);
    expect(boxes).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      TRUE_VALUE
    );
    expect(boxes.children).toHaveLength(
      PASSWORD_RESET_PIN.LENGTH
    );
    expect(boxes).toHaveTextContent(TYPED_PIN);
  });

  it("lays the real input over the boxes so a tap or a paste reaches it", () => {
    renderPinField();

    expect(getInput()).toHaveClass(
      ...PASSWORD_RECOVERY_PIN_BOXES_INPUT_CLASS.split(" ")
    );
  });

  it("serves a plain centred input before the page is interactive", () => {
    const markup = renderToStaticMarkup(
      <PasswordRecoveryPinField
        error={null}
        inputRef={{ current: null }}
        isPending={false}
        onChange={() => undefined}
        value={TYPED_PIN}
      />
    );
    const container = document.createElement("div");
    container.innerHTML = markup;

    expect(
      container.querySelector(PIN_INPUT_SELECTOR)
    ).toHaveClass(
      ...PASSWORD_RECOVERY_PIN_INPUT_CLASS.split(" ")
    );
    expect(
      container.querySelector(
        `[${PIN_BOXES_TEST_ID_ATTRIBUTE}]`
      )
    ).toBeNull();
  });

  it("describes the input with the digits hint", () => {
    renderPinField();

    expect(
      screen.getByText(
        PASSWORD_RECOVERY_RESET_COPY.PIN_HINT
      )
    ).toHaveAttribute(
      ID_ATTRIBUTE,
      PASSWORD_RECOVERY_PIN_HINT_ID
    );
    expect(getInput()).toHaveAttribute(
      DESCRIBED_BY_ATTRIBUTE,
      PASSWORD_RECOVERY_PIN_HINT_ID
    );
  });

  it("lists the error before the hint when the field is invalid", () => {
    renderPinField({ error: FIELD_ERROR_MESSAGE });

    expect(getInput()).toHaveAttribute(
      DESCRIBED_BY_ATTRIBUTE,
      `${PASSWORD_RECOVERY_FIELD.PIN}${FIELD_ERROR_ID_SUFFIX} ${PASSWORD_RECOVERY_PIN_HINT_ID}`
    );
    expect(
      screen.getByText(FIELD_ERROR_MESSAGE)
    ).toBeVisible();
  });

  it("is editable while idle", () => {
    renderPinField();
    expect(getInput()).toHaveProperty(
      READONLY_PROPERTY,
      false
    );
  });

  it("locks the input while pending", () => {
    renderPinField({ isPending: true });

    expect(getInput()).toHaveProperty(
      READONLY_PROPERTY,
      true
    );
  });
});
