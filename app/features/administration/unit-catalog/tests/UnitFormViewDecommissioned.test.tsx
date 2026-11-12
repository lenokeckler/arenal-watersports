import { describe, expect, it, vi } from "vitest";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { UNIT_FORM_MODE } from "../constants/UnitFormMode.constants";
import {
  buildUnitFormViewProps,
  FORM_SUBMIT_LABEL,
} from "./UnitForm.constants";
import {
  DECOMMISSIONED_UNIT,
  EXPECTED_DATE_TEXT,
  FAKE_DECOMMISSION_REASON,
} from "./UnitDecommissionNotice.constants";
import { renderUnitForm } from "./renderUnitForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

const decommissionedProps = buildUnitFormViewProps({
  mode: UNIT_FORM_MODE.EDIT,
  unit: DECOMMISSIONED_UNIT,
});
const { OPEN_BUTTON, DECOMMISSIONED_NOTICE_PREFIX } =
  UNIT_DECOMMISSION_COPY;

describe("UnitFormView with a decommissioned unit", () => {
  it("states the decommission date and the reason", () => {
    const page = renderUnitForm(decommissionedProps);

    const notice = page.getNotice(
      DECOMMISSIONED_NOTICE_PREFIX
    );

    expect(notice).toHaveTextContent(EXPECTED_DATE_TEXT);
    expect(notice).toHaveTextContent(
      FAKE_DECOMMISSION_REASON
    );
  });

  it("opens read only with no save and no decommission button", () => {
    const page = renderUnitForm(decommissionedProps);

    expect(page.getStatusSelect()).toBeDisabled();
    expect(
      page.getControl(UNIT_FORM_COPY.CODE_LABEL)
    ).toBeDisabled();
    expect(
      page.getButton(UNIT_FORM_COPY.BACK_BUTTON)
    ).toBeInTheDocument();
    [
      FORM_SUBMIT_LABEL[UNIT_FORM_MODE.EDIT],
      OPEN_BUTTON,
    ].forEach((name) => {
      expect(
        page.queryButton(name)
      ).not.toBeInTheDocument();
    });
  });
});
