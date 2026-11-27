import {
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  DAMAGE_REPORT_OUTCOME,
  PATHS,
} from "@/app/constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
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

const expectSavedAs = async (
  outcome: string
): Promise<void> => {
  await waitFor(() =>
    expect(mocks.replace).toHaveBeenCalledWith(
      PATHS.OPERATIONS.DAMAGE_REPORTS_SAVED(outcome)
    )
  );
};

describe("DamageReportForm", () => {
  beforeEach(() => {
    mocks.replace.mockReset();
    mocks.submit
      .mockReset()
      .mockResolvedValue({ ok: true });
  });

  afterEach(cleanup);

  it("asks for the cause and the description before saving", () => {
    createDamageReportFormPage().press(
      DAMAGE_REPORT_COPY.SUBMIT_BUTTON
    );

    expect(
      screen.getByText(
        DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        DAMAGE_REPORT_COPY.DESCRIPTION_REQUIRED_ERROR
      )
    ).toBeInTheDocument();
    expect(mocks.submit).not.toHaveBeenCalled();
  });

  it("saves the cause, the text and the hits, then opens the list", async () => {
    const form = createDamageReportFormPage();

    form.chooseCause("rollover");
    form.describeDamage("Manillar doblado");
    form.press(DAMAGE_REPORT_COPY.HITS_MORE);
    form.press(DAMAGE_REPORT_COPY.SUBMIT_BUTTON);

    await expectSavedAs(DAMAGE_REPORT_OUTCOME.COMPLETE);
    expect(mocks.submit).toHaveBeenCalledWith(
      expect.objectContaining({
        cause: "rollover",
        description: "Manillar doblado",
        detailLater: false,
        hits: 2,
        unitStatus: "damaged",
      })
    );
  });

  it("saves without detail when it is left for later", async () => {
    createDamageReportFormPage().press(
      DAMAGE_REPORT_COPY.SUBMIT_LATER_BUTTON
    );

    await expectSavedAs(DAMAGE_REPORT_OUTCOME.LATER);
    expect(mocks.submit).toHaveBeenCalledWith(
      expect.objectContaining({
        cause: null,
        detailLater: true,
      })
    );
  });

  it("shows the refusal and stays on the form", async () => {
    mocks.submit.mockResolvedValue({
      message: DAMAGE_REPORT_COPY.OUT_ON_WATER,
      ok: false,
    });

    createDamageReportFormPage().press(
      DAMAGE_REPORT_COPY.SUBMIT_LATER_BUTTON
    );

    expect(
      await screen.findByText(
        DAMAGE_REPORT_COPY.OUT_ON_WATER
      )
    ).toBeInTheDocument();
    expect(mocks.replace).not.toHaveBeenCalled();
  });
});
