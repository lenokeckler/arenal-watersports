import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DispatchGroupForm from "../components/DispatchGroupForm";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import { createDispatchSheetPage } from "./DispatchSheet.page";
import {
  DISPATCH_FIXTURE_GAUGE,
  DISPATCH_FIXTURE_UNIT,
  KILOMETERS_GROUP_FIXTURE,
  MOTOR_READINGS_GROUP_FIXTURE,
  NO_LEVEL_FUEL_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const FIRST = DISPATCH_FIXTURE_UNIT.FIRST;
const FOURTH_LINE = "Raya 4 de 4";
const SECOND_LINE = "Raya 2 de 4";
const THIRD_LINE = "Raya 3 de 4";
const FIRST_LINE = "Raya 1 de 4";
const FOUR_LINES = 4;
const FIRST_UNIT_LEVEL = 1;

const renderForm = (
  group = MOTOR_READINGS_GROUP_FIXTURE,
  preselectedUnitIds: string[] = [FIRST.unitId]
) => {
  const onSubmit = vi.fn();
  render(
    <DispatchGroupForm
      group={{ ...group, requiredQuantity: 1 }}
      isSubmitting={false}
      onSubmit={onSubmit}
      preselectedUnitIds={preselectedUnitIds}
    />
  );

  return { onSubmit, sheet: createDispatchSheetPage() };
};

describe("DispatchGroupForm fuel", () => {
  it("starts the gauge at the last known level and lets the unit leave untouched", async () => {
    const { onSubmit, sheet } = renderForm();

    expect(
      screen.getByRole("group", {
        name: /Gasolina: 2 de 4/,
      })
    ).toBeInTheDocument();
    expect(sheet.getSubmit()).toBeEnabled();

    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings).toEqual([
      {
        fuel: DISPATCH_FIXTURE_GAUGE.LAST_FUEL,
        unitId: FIRST.unitId,
        usage: null,
      },
    ]);
  });

  it("sends the level the worker marks on the gauge", async () => {
    const { onSubmit, sheet } = renderForm();

    await userEvent.click(
      sheet.getGaugeLine(FIRST.code, FOURTH_LINE)
    );
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings[0].fuel).toBe(
      FOUR_LINES
    );
  });

  it("lowers the level by one when the line of the current level is tapped", async () => {
    const { onSubmit, sheet } = renderForm();

    await userEvent.click(
      sheet.getGaugeLine(FIRST.code, SECOND_LINE)
    );
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings[0].fuel).toBe(
      FIRST_UNIT_LEVEL
    );
  });

  it("cannot leave a unit without any known level until the level is marked", async () => {
    const { onSubmit, sheet } = renderForm(
      NO_LEVEL_FUEL_GROUP_FIXTURE
    );

    expect(sheet.getSubmit()).toBeDisabled();
    expect(
      screen.getByText(DISPATCH_SHEET_COPY.FUEL_MISSING)
    ).toBeInTheDocument();

    await userEvent.click(
      sheet.getGaugeLine(FIRST.code, THIRD_LINE)
    );

    expect(sheet.getSubmit()).toBeEnabled();

    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings[0].fuel).toBe(
      DISPATCH_FIXTURE_GAUGE.MAX - 1
    );
  });

  it("can mark an empty tank by tapping the first line at level one", async () => {
    const { onSubmit, sheet } = renderForm(
      NO_LEVEL_FUEL_GROUP_FIXTURE
    );

    await userEvent.click(
      sheet.getGaugeLine(FIRST.code, FIRST_LINE)
    );
    await userEvent.click(
      sheet.getGaugeLine(FIRST.code, FIRST_LINE)
    );
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings[0].fuel).toBe(
      0
    );
  });

  it("asks for no gauge when the category burns no fuel", async () => {
    const { onSubmit, sheet } = renderForm(
      KILOMETERS_GROUP_FIXTURE
    );

    expect(
      screen.queryByRole("group", { name: /Gasolina/ })
    ).not.toBeInTheDocument();

    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings).toEqual([]);
  });
});
