import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import DispatchGroupForm from "../components/DispatchGroupForm";
import { createDispatchSheetPage } from "./DispatchSheet.page";
import {
  ASSIGNED_GROUP_FIXTURE,
  DISPATCH_FIXTURE_UNIT,
  DISPATCH_TIME_FIXTURE,
  QUANTITY_GROUP_FIXTURE,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const renderForm = (
  group = UNIT_GROUP_FIXTURE,
  onSubmit = vi.fn()
) => {
  render(
    <DispatchGroupForm
      group={group}
      isSubmitting={false}
      onSubmit={onSubmit}
    />
  );

  return { onSubmit, sheet: createDispatchSheetPage() };
};

describe("DispatchGroupForm", () => {
  it("is a single screen: units, radio, times and the dispatch button", () => {
    const { sheet } = renderForm();

    expect(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.FIRST.code)
    ).toBeInTheDocument();
    expect(sheet.getRadio()).toBeInTheDocument();
    expect(sheet.getDeparture()).toBeInTheDocument();
    expect(sheet.getReturn()).toBeInTheDocument();
    expect(sheet.getSubmit()).toBeDisabled();
  });

  it("asks for exactly the units that leave now", async () => {
    const { sheet } = renderForm();

    await userEvent.click(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.FIRST.code)
    );
    await userEvent.click(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.SECOND.code)
    );

    expect(sheet.getSubmit()).toBeEnabled();
  });

  it("stops offering more units once the committed ones are chosen", async () => {
    const { sheet } = renderForm(ASSIGNED_GROUP_FIXTURE);

    expect(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.FIRST.code)
    ).toBeEnabled();

    await userEvent.click(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.FIRST.code)
    );

    expect(sheet.getSubmit()).toBeEnabled();
  });

  it("sends the chosen units with the departure and the return", async () => {
    const { onSubmit, sheet } = renderForm();

    await userEvent.click(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.FIRST.code)
    );
    await userEvent.click(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.SECOND.code)
    );
    fireEvent.change(sheet.getDeparture(), {
      target: {
        value: DISPATCH_TIME_FIXTURE.DEPARTURE_MORNING,
      },
    });
    fireEvent.change(sheet.getReturn(), {
      target: {
        value: DISPATCH_TIME_FIXTURE.RETURN_MORNING,
      },
    });
    await userEvent.click(sheet.getSubmit());

    const [selection] = onSubmit.mock.calls[0];
    expect(selection.unitIds).toEqual([
      DISPATCH_FIXTURE_UNIT.FIRST.unitId,
      DISPATCH_FIXTURE_UNIT.SECOND.unitId,
    ]);
    expect(
      Date.parse(selection.returnsAt) -
        Date.parse(selection.departureAt)
    ).toBe(
      DISPATCH_TIME_FIXTURE.TWO_HOURS *
        DISPATCH_TIME_FIXTURE.HOUR_MS
    );
  });

  it("reads a return before the departure as the next day", async () => {
    const { onSubmit, sheet } = renderForm(
      QUANTITY_GROUP_FIXTURE
    );

    fireEvent.change(sheet.getDeparture(), {
      target: {
        value: DISPATCH_TIME_FIXTURE.DEPARTURE_EVENING,
      },
    });
    fireEvent.change(sheet.getReturn(), {
      target: {
        value: DISPATCH_TIME_FIXTURE.RETURN_AFTER_MIDNIGHT,
      },
    });

    expect(
      screen.getByText(DISPATCH_SHEET_COPY.NEXT_DAY_NOTE)
    ).toBeInTheDocument();

    await userEvent.click(sheet.getSubmit());

    const [selection] = onSubmit.mock.calls[0];
    expect(
      Date.parse(selection.returnsAt) -
        Date.parse(selection.departureAt)
    ).toBe(
      DISPATCH_TIME_FIXTURE.THREE_HOURS *
        DISPATCH_TIME_FIXTURE.HOUR_MS
    );
  });

  it("keeps the unit already assigned to the reservation", async () => {
    const { onSubmit, sheet } = renderForm(
      ASSIGNED_GROUP_FIXTURE
    );

    expect(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.ASSIGNED.code)
    ).toBeChecked();
    expect(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.ASSIGNED.code)
    ).toBeDisabled();

    await userEvent.click(
      sheet.getUnit(DISPATCH_FIXTURE_UNIT.FIRST.code)
    );
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].unitIds).toEqual([
      DISPATCH_FIXTURE_UNIT.ASSIGNED.unitId,
      DISPATCH_FIXTURE_UNIT.FIRST.unitId,
    ]);
  });

  it("needs no units when the category is counted by quantity", () => {
    const { sheet } = renderForm(QUANTITY_GROUP_FIXTURE);

    expect(sheet.queryUnits()).toHaveLength(0);
    expect(
      screen.getByText(DISPATCH_SHEET_COPY.QUANTITY_NOTE)
    ).toBeInTheDocument();
    expect(sheet.getSubmit()).toBeEnabled();
  });

  it("shows the pending equipment with or without motor", () => {
    renderForm(UNIT_GROUP_FIXTURE);

    expect(
      screen.getByText(
        new RegExp(DISPATCH_SHEET_COPY.WITHOUT_MOTOR)
      )
    ).toBeInTheDocument();
  });

  it("writes no explanation about steps or readings", () => {
    renderForm(UNIT_GROUP_FIXTURE);

    expect(
      screen.queryByText(/Paso \d de \d/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Siguiente/ })
    ).not.toBeInTheDocument();
  });
});
