import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DispatchGroupForm from "../components/DispatchGroupForm";
import { createDispatchSheetPage } from "./DispatchSheet.page";
import {
  DISPATCH_FIXTURE_UNIT,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const FIRST = DISPATCH_FIXTURE_UNIT.FIRST;
const SECOND = DISPATCH_FIXTURE_UNIT.SECOND;

const renderForm = (preselectedUnitIds: string[]) => {
  const onSubmit = vi.fn();
  render(
    <DispatchGroupForm
      group={UNIT_GROUP_FIXTURE}
      isSubmitting={false}
      onSubmit={onSubmit}
      preselectedUnitIds={preselectedUnitIds}
    />
  );

  return { onSubmit, sheet: createDispatchSheetPage() };
};

describe("DispatchGroupForm opened from the board", () => {
  it("opens with the tapped units already checked and ready to confirm", () => {
    const { sheet } = renderForm([
      FIRST.unitId,
      SECOND.unitId,
    ]);

    expect(sheet.getUnit(FIRST.code)).toBeChecked();
    expect(sheet.getUnit(SECOND.code)).toBeChecked();
    expect(sheet.getSubmit()).toBeEnabled();
  });

  it("dispatches exactly the tapped units", async () => {
    const { onSubmit, sheet } = renderForm([
      FIRST.unitId,
      SECOND.unitId,
    ]);

    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].unitIds).toEqual([
      FIRST.unitId,
      SECOND.unitId,
    ]);
  });

  it("lets the worker complete the units that are still missing", async () => {
    const { sheet } = renderForm([FIRST.unitId]);

    expect(sheet.getSubmit()).toBeDisabled();

    await userEvent.click(sheet.getUnit(SECOND.code));

    expect(sheet.getSubmit()).toBeEnabled();
  });

  it("lets the worker uncheck a tapped unit", async () => {
    const { sheet } = renderForm([
      FIRST.unitId,
      SECOND.unitId,
    ]);

    await userEvent.click(sheet.getUnit(SECOND.code));

    expect(sheet.getUnit(SECOND.code)).not.toBeChecked();
    expect(sheet.getSubmit()).toBeDisabled();
  });
});
