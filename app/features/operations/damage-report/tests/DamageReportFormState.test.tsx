import { cleanup, screen } from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import {
  NEW_REPORT_SCREEN,
  PENDING_REPORT_SCREEN,
  REPORT_UNIT,
} from "./DamageReport.constants";
import { createDamageReportFormPage } from "./DamageReportForm.page";

const mocks = vi.hoisted(() => ({
  replace: vi.fn(),
  submit: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mocks.replace }),
}));

vi.mock("../actions/submitDamageReport", () => ({
  submitDamageReport: mocks.submit,
}));

describe("DamageReportForm machine state", () => {
  afterEach(cleanup);

  it("cannot leave the detail for later while completing", () => {
    const form = createDamageReportFormPage(
      PENDING_REPORT_SCREEN
    );

    expect(
      form.queryButton(
        DAMAGE_REPORT_COPY.SUBMIT_LATER_BUTTON
      )
    ).not.toBeInTheDocument();
    expect(
      form.queryChoice(DAMAGE_REPORT_COPY.STATE_KEEP)
    ).toBeChecked();
  });

  it("does not offer a state for a machine out on the water", () => {
    const form = createDamageReportFormPage({
      ...NEW_REPORT_SCREEN,
      units: [{ ...REPORT_UNIT, isOut: true }],
    });

    expect(
      screen.getByText(DAMAGE_REPORT_COPY.OUT_NOTE)
    ).toBeInTheDocument();
    expect(
      form.queryChoice(DAMAGE_REPORT_COPY.STATE_DAMAGED)
    ).not.toBeInTheDocument();
  });
});
