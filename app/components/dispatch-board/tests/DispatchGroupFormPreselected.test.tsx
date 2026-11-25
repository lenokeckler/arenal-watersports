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
  it("shows the tapped units instead of the grid when they are complete", () => {
    const { sheet } = renderForm([
      FIRST.unitId,
      SECOND.unitId,
    ]);

    expect(sheet.queryUnits()).toHaveLength(0);
    expect(sheet.getChangeUnits()).toBeInTheDocument();
    expect(sheet.getSubmit()).toBeEnabled();
  });

  it("brings the unit grid back with the tapped units checked", async () => {
    const { sheet } = renderForm([
      FIRST.unitId,
      SECOND.unitId,
    ]);

    await userEvent.click(sheet.getChangeUnits());

    expect(sheet.queryUnits()).toHaveLength(
      UNIT_GROUP_FIXTURE.candidateUnits.length
    );
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

  it("sends only the tapped unit when one of two leaves now", async () => {
    const { onSubmit, sheet } = renderForm([FIRST.unitId]);

    expect(sheet.getTakeMore()).toBeEnabled();
    expect(sheet.getSubmit()).toBeEnabled();

    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].unitIds).toEqual([
      FIRST.unitId,
    ]);
  });

  it("lets the worker complete the units when the pair is wanted", async () => {
    const { sheet } = renderForm([FIRST.unitId]);

    await userEvent.click(sheet.getTakeMore());

    expect(sheet.getSubmit()).toBeDisabled();

    await userEvent.click(sheet.getUnit(SECOND.code));

    expect(sheet.getSubmit()).toBeEnabled();
  });
});
