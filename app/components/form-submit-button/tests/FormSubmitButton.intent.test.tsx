import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import FormSubmitButton from "../FormSubmitButton";
import type { FormSubmitButtonProps } from "../models/FormSubmitButtonProps.interface";
import {
  IDLE_LABEL,
  INTENT_NAME,
  INTENT_VALUE,
  PENDING_LABEL,
} from "./FormSubmitButton.constants";
import { DEFAULT_PROPS } from "./FormSubmitButton.defaults.constants";
import { createFormSubmitButtonPage } from "./FormSubmitButton.page";

const renderButton = (
  overrides: Partial<FormSubmitButtonProps> = {}
) => {
  render(
    <FormSubmitButton
      {...DEFAULT_PROPS}
      {...overrides}
    />
  );
  return createFormSubmitButtonPage();
};

describe("FormSubmitButton intent", () => {
  it("carries the name and value of its intent", () => {
    const page = renderButton({
      name: INTENT_NAME,
      value: INTENT_VALUE,
    });

    expect(page.getButton(IDLE_LABEL)).toHaveAttribute(
      "name",
      INTENT_NAME
    );
    expect(page.getButton(IDLE_LABEL)).toHaveAttribute(
      "value",
      INTENT_VALUE
    );
  });

  it("has neither attribute by default", () => {
    const page = renderButton();

    expect(page.getButton(IDLE_LABEL)).not.toHaveAttribute(
      "name"
    );
    expect(page.getButton(IDLE_LABEL)).not.toHaveAttribute(
      "value"
    );
  });

  it("keeps the idle label and icon while another intent is pending", () => {
    const page = renderButton({
      isPending: true,
      showsProgress: false,
    });

    expect(page.getButton(IDLE_LABEL)).toHaveAttribute(
      "aria-disabled",
      "true"
    );
    expect(page.queryText(PENDING_LABEL)).toBeNull();
    expect(
      page.queryText(MATERIAL_ICON_NAME.PROGRESS_ACTIVITY)
    ).toBeNull();
    expect(
      page.queryText(MATERIAL_ICON_NAME.LOCK_RESET)
    ).toBeInTheDocument();
  });

  it("shows progress while pending when it is the pressed one", () => {
    const page = renderButton({
      isPending: true,
      showsProgress: true,
    });

    expect(page.getButton(PENDING_LABEL)).toBeEnabled();
  });
});
