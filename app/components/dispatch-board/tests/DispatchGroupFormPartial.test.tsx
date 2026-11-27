import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DispatchGroupForm from "../components/DispatchGroupForm";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import { createDispatchSheetPage } from "./DispatchSheet.page";
import {
  ASSIGNED_GROUP_FIXTURE,
  DISPATCH_FIXTURE_COUNT,
  DISPATCH_FIXTURE_UNIT,
  QUANTITY_GROUP_FIXTURE,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const FIRST = DISPATCH_FIXTURE_UNIT.FIRST;
const SECOND = DISPATCH_FIXTURE_UNIT.SECOND;
const RADIO_FIXTURE = {
  CHANNEL: "7",
  CHANNEL_NUMBER: 7,
  OUT_OF_RANGE: "100",
} as const;

const renderForm = (
  group = UNIT_GROUP_FIXTURE,
  preselectedUnitIds: string[] = []
) => {
  const onSubmit = vi.fn();
  render(
    <DispatchGroupForm
      group={group}
      isSubmitting={false}
      onSubmit={onSubmit}
      preselectedUnitIds={preselectedUnitIds}
    />
  );

  return { onSubmit, sheet: createDispatchSheetPage() };
};

describe("DispatchGroupForm partial dispatch", () => {
  it("offers how many leave now when several are pending", () => {
    renderForm();

    expect(
      screen.getByText(
        `${DISPATCH_FIXTURE_COUNT.TWO}${DISPATCH_SHEET_COPY.SELECTED_OF}${DISPATCH_FIXTURE_COUNT.TWO}`
      )
    ).toBeInTheDocument();
  });

  it("does not offer it when a single unit is pending", () => {
    const { sheet } = renderForm({
      ...UNIT_GROUP_FIXTURE,
      requiredQuantity: DISPATCH_FIXTURE_COUNT.ONE,
    });

    expect(sheet.queryTakeLess()).not.toBeInTheDocument();
  });

  it("does not offer it when the units are already assigned to the reservation", () => {
    const { sheet } = renderForm(ASSIGNED_GROUP_FIXTURE);

    expect(sheet.queryTakeLess()).not.toBeInTheDocument();
  });

  it("does not offer it for a category counted by quantity", () => {
    const { sheet } = renderForm(QUANTITY_GROUP_FIXTURE);

    expect(sheet.queryTakeLess()).not.toBeInTheDocument();
  });

  it("says how many stay pending when fewer leave", async () => {
    const { sheet } = renderForm();

    await userEvent.click(sheet.getTakeLess());

    expect(
      screen.getByText(DISPATCH_SHEET_COPY.TAKE_REST(1))
    ).toBeInTheDocument();
  });

  it("asks for one unit only after lowering the count", async () => {
    const { onSubmit, sheet } = renderForm();

    await userEvent.click(sheet.getTakeLess());
    await userEvent.click(sheet.getUnit(SECOND.code));

    expect(sheet.queryUnits()).toHaveLength(0);
    expect(sheet.getSubmit()).toBeEnabled();

    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].unitIds).toEqual([
      SECOND.unitId,
    ]);
  });

  it("drops the extra chosen unit when the count is lowered", async () => {
    const { onSubmit, sheet } = renderForm(
      UNIT_GROUP_FIXTURE,
      [FIRST.unitId, SECOND.unitId]
    );

    await userEvent.click(sheet.getTakeLess());
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].unitIds).toEqual([
      FIRST.unitId,
    ]);
  });

  it("cannot go below one unit or above the pending ones", async () => {
    const { sheet } = renderForm();

    expect(sheet.getTakeMore()).toBeDisabled();

    await userEvent.click(sheet.getTakeLess());

    expect(sheet.getTakeLess()).toBeDisabled();
    expect(sheet.getTakeMore()).toBeEnabled();
  });
});

describe("DispatchGroupForm radio channel", () => {
  it("leaves the channel empty by default", async () => {
    const { onSubmit, sheet } = renderForm(
      QUANTITY_GROUP_FIXTURE
    );

    await userEvent.click(sheet.getSubmit());

    expect(
      onSubmit.mock.calls[0][0].radioChannel
    ).toBeNull();
  });

  it("sends the channel typed by the worker", async () => {
    const { onSubmit, sheet } = renderForm(
      QUANTITY_GROUP_FIXTURE
    );

    await userEvent.type(
      sheet.getRadio(),
      RADIO_FIXTURE.CHANNEL
    );
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].radioChannel).toBe(
      RADIO_FIXTURE.CHANNEL_NUMBER
    );
  });

  it("refuses a channel outside the range and says so", async () => {
    const { sheet } = renderForm(QUANTITY_GROUP_FIXTURE);

    await userEvent.type(
      sheet.getRadio(),
      RADIO_FIXTURE.OUT_OF_RANGE
    );

    expect(
      screen.getByText(DISPATCH_SHEET_COPY.RADIO_INVALID)
    ).toBeInTheDocument();
    expect(sheet.getSubmit()).toBeDisabled();
  });
});
