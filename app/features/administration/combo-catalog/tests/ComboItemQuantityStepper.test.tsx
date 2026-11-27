import { saveComboMock } from "./comboForm.harness";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import ComboFormView from "../ComboFormView";
import {
  CREATE_FORM_PROPS,
  FIRST_ROW_NUMBER,
  SAVE_SUCCESS_RESULT,
} from "./ComboForm.constants";
import { createComboFormPage } from "./ComboForm.page";

const QUANTITY_AFTER_TWO_INCREASES = "2";
const MIN_QUANTITY = "1";

const clickStep = async (
  user: ReturnType<typeof userEvent.setup>,
  name: string
): Promise<void> => {
  await user.click(
    screen.getByRole(ARIA_ROLE.BUTTON, { name })
  );
};

describe("Combo item quantity stepper", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    saveComboMock.mockResolvedValue(SAVE_SUCCESS_RESULT);
  });

  it("raises the quantity with plus and never goes under one with minus", async () => {
    const user = userEvent.setup();
    render(<ComboFormView {...CREATE_FORM_PROPS} />);
    const page = createComboFormPage();

    await clickStep(
      user,
      COMBO_FORM_COPY.QUANTITY_INCREASE_LABEL
    );
    await clickStep(
      user,
      COMBO_FORM_COPY.QUANTITY_INCREASE_LABEL
    );

    expect(
      page.getQuantityField(FIRST_ROW_NUMBER)
    ).toHaveValue(QUANTITY_AFTER_TWO_INCREASES);

    await clickStep(
      user,
      COMBO_FORM_COPY.QUANTITY_DECREASE_LABEL
    );
    await clickStep(
      user,
      COMBO_FORM_COPY.QUANTITY_DECREASE_LABEL
    );

    expect(
      page.getQuantityField(FIRST_ROW_NUMBER)
    ).toHaveValue(MIN_QUANTITY);
  });
});
