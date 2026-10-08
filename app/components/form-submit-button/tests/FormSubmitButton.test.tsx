import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import FormSubmitButton from "../FormSubmitButton";
import {
  ARIA_DISABLED_ATTRIBUTE,
  ARIA_DISABLED_TRUE,
  SUBMIT_LABEL,
  SUBMIT_PENDING_LABEL,
} from "./FormSubmitButton.constants";
import { createFormSubmitButtonPage } from "./FormSubmitButton.page";

const renderButton = (isPending: boolean) => {
  render(
    <FormSubmitButton
      icon={MATERIAL_ICON_NAME.LOCK_RESET}
      isPending={isPending}
      label={SUBMIT_LABEL}
      pendingLabel={SUBMIT_PENDING_LABEL}
    />
  );
  return createFormSubmitButtonPage();
};

describe("FormSubmitButton", () => {
  it("shows the label and the given icon when idle", () => {
    const page = renderButton(false);

    expect(
      page.getButton(SUBMIT_LABEL)
    ).not.toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_DISABLED_TRUE
    );
    expect(
      page.getIcon(MATERIAL_ICON_NAME.LOCK_RESET)
    ).toBeInTheDocument();
  });

  it("shows the pending label and a spinner and stays focusable while pending", () => {
    const page = renderButton(true);

    expect(
      page.getButton(SUBMIT_PENDING_LABEL)
    ).toHaveAttribute(
      ARIA_DISABLED_ATTRIBUTE,
      ARIA_DISABLED_TRUE
    );
    expect(
      page.getButton(SUBMIT_PENDING_LABEL)
    ).toBeEnabled();
    expect(
      page.getIcon(MATERIAL_ICON_NAME.PROGRESS_ACTIVITY)
    ).toBeInTheDocument();
  });
});
