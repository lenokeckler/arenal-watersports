import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import FormSubmitButton from "../FormSubmitButton";
import {
  IDLE_LABEL,
  PENDING_LABEL,
  SUBMIT_TYPE,
} from "./FormSubmitButton.constants";
import { createFormSubmitButtonPage } from "./FormSubmitButton.page";

const renderButton = (isPending: boolean) => {
  render(
    <FormSubmitButton
      icon={MATERIAL_ICON_NAME.LOCK_RESET}
      isPending={isPending}
      label={IDLE_LABEL}
      pendingLabel={PENDING_LABEL}
    />
  );
  return createFormSubmitButtonPage();
};

describe("FormSubmitButton", () => {
  it("shows the idle label and the given icon", () => {
    const page = renderButton(false);

    expect(page.getButton(IDLE_LABEL)).toHaveAttribute(
      "type",
      SUBMIT_TYPE
    );
    expect(
      page.queryText(MATERIAL_ICON_NAME.LOCK_RESET)
    ).toBeInTheDocument();
    expect(page.queryText(PENDING_LABEL)).toBeNull();
  });

  it("swaps to the pending label and the progress icon", () => {
    const page = renderButton(true);

    expect(page.getButton(PENDING_LABEL)).toBeEnabled();
    expect(
      page.queryText(MATERIAL_ICON_NAME.PROGRESS_ACTIVITY)
    ).toBeInTheDocument();
    expect(
      page.queryText(MATERIAL_ICON_NAME.LOCK_RESET)
    ).toBeNull();
  });
});
