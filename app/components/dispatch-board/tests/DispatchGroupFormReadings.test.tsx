import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import DispatchGroupForm from "../components/DispatchGroupForm";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_USAGE_COPY,
} from "../constants/DispatchSheetCopy.constants";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import { createDispatchSheetPage } from "./DispatchSheet.page";
import {
  ASSIGNED_GROUP_FIXTURE,
  DISPATCH_FIXTURE_GAUGE,
  DISPATCH_FIXTURE_UNIT,
  KILOMETERS_GROUP_FIXTURE,
  MOTOR_READINGS_GROUP_FIXTURE,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const HOURS_LABEL = DISPATCH_USAGE_COPY.engine_hours.LABEL;
const FIRST = DISPATCH_FIXTURE_UNIT.FIRST;
const SECOND = DISPATCH_FIXTURE_UNIT.SECOND;
const HALF_OF_FOUR = "Medio tanque: 2 de 4";
const FULL_OF_FOUR = "Lleno: 4 de 4";
const HOURS_ABOVE_LAST = "13";
const HOURS_BELOW_LAST = "12";
const HOURS_WITH_COMMA = "13,5";

const renderForm = (group: DispatchSheetGroup) => {
  const onSubmit = vi.fn();
  render(
    <DispatchGroupForm
      group={group}
      isSubmitting={false}
      onSubmit={onSubmit}
    />
  );

  return { onSubmit, sheet: createDispatchSheetPage() };
};

const chooseBothUnits = async (
  sheet: ReturnType<typeof createDispatchSheetPage>
) => {
  await userEvent.click(sheet.getUnit(FIRST.code));
  await userEvent.click(sheet.getUnit(SECOND.code));
};

describe("DispatchGroupForm readings", () => {
  it("asks for no reading until a unit is chosen", () => {
    renderForm(MOTOR_READINGS_GROUP_FIXTURE);

    expect(
      screen.queryByText(
        DISPATCH_SHEET_COPY.READINGS_LEGEND
      )
    ).not.toBeInTheDocument();
  });

  it("shows a card per chosen unit with the last reading as a hint", async () => {
    const { sheet } = renderForm(
      MOTOR_READINGS_GROUP_FIXTURE
    );

    await chooseBothUnits(sheet);

    expect(
      screen.getByText(DISPATCH_SHEET_COPY.READINGS_LEGEND)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        `${DISPATCH_SHEET_COPY.FUEL_PREVIOUS_PREFIX}${DISPATCH_FIXTURE_GAUGE.LAST_FUEL} de ${DISPATCH_FIXTURE_GAUGE.MAX}.`
      )
    ).toHaveLength(2);
    expect(
      screen.getAllByText(
        `${DISPATCH_SHEET_COPY.USAGE_PREVIOUS_PREFIX}${DISPATCH_FIXTURE_GAUGE.LAST_USAGE}${DISPATCH_USAGE_COPY.engine_hours.UNIT}`
      )
    ).toHaveLength(2);
    expect(
      sheet.getReadingFuelField(FIRST.code)
    ).toHaveValue("");
  });

  it("does not let the dispatch leave without every reading", async () => {
    const { sheet } = renderForm(
      MOTOR_READINGS_GROUP_FIXTURE
    );

    await chooseBothUnits(sheet);
    expect(sheet.getSubmit()).toBeDisabled();

    await userEvent.click(
      sheet.getReadingPreset(FIRST.code, HALF_OF_FOUR)
    );
    await userEvent.type(
      sheet.getReadingUsageField(FIRST.code, HOURS_LABEL),
      HOURS_ABOVE_LAST
    );
    expect(sheet.getSubmit()).toBeDisabled();

    await userEvent.click(
      sheet.getReadingPreset(SECOND.code, FULL_OF_FOUR)
    );
    await userEvent.type(
      sheet.getReadingUsageField(SECOND.code, HOURS_LABEL),
      HOURS_ABOVE_LAST
    );
    expect(sheet.getSubmit()).toBeEnabled();
  });

  it("sends one reading per unit with the fuel in lines", async () => {
    const { onSubmit, sheet } = renderForm(
      MOTOR_READINGS_GROUP_FIXTURE
    );

    await chooseBothUnits(sheet);
    await userEvent.click(
      sheet.getReadingPreset(FIRST.code, HALF_OF_FOUR)
    );
    await userEvent.type(
      sheet.getReadingUsageField(FIRST.code, HOURS_LABEL),
      HOURS_WITH_COMMA
    );
    await userEvent.type(
      sheet.getReadingFuelField(SECOND.code),
      "3"
    );
    await userEvent.type(
      sheet.getReadingUsageField(SECOND.code, HOURS_LABEL),
      HOURS_ABOVE_LAST
    );
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings).toEqual([
      { fuel: 2, unitId: FIRST.unitId, usage: 13.5 },
      { fuel: 3, unitId: SECOND.unitId, usage: 13 },
    ]);
  });

  it("fills the exact field when a line of the gauge is tapped", async () => {
    const { sheet } = renderForm(
      MOTOR_READINGS_GROUP_FIXTURE
    );

    await chooseBothUnits(sheet);
    await userEvent.click(
      screen.getAllByRole(ARIA_ROLE.BUTTON, {
        name: "Raya 3 de 4",
      })[0]
    );

    expect(
      sheet.getReadingFuelField(FIRST.code)
    ).toHaveValue("3");
  });

  it("refuses hours below what the unit already has", async () => {
    const { sheet } = renderForm(
      MOTOR_READINGS_GROUP_FIXTURE
    );

    await chooseBothUnits(sheet);
    await userEvent.type(
      sheet.getReadingUsageField(FIRST.code, HOURS_LABEL),
      HOURS_BELOW_LAST
    );

    expect(
      screen.getByText(
        `${DISPATCH_SHEET_COPY.USAGE_BELOW_PREFIX}${DISPATCH_FIXTURE_GAUGE.LAST_USAGE}.`
      )
    ).toBeInTheDocument();
    expect(sheet.getSubmit()).toBeDisabled();
  });

  it("refuses fuel beyond the gauge of the unit", async () => {
    const { sheet } = renderForm(
      MOTOR_READINGS_GROUP_FIXTURE
    );

    await chooseBothUnits(sheet);
    await userEvent.type(
      sheet.getReadingFuelField(FIRST.code),
      "7"
    );

    expect(
      screen.getByText(
        `${DISPATCH_SHEET_COPY.FUEL_INVALID_PREFIX}${DISPATCH_FIXTURE_GAUGE.MAX}.`
      )
    ).toBeInTheDocument();
  });

  it("asks only for kilometers when the category burns no fuel", async () => {
    const { onSubmit, sheet } = renderForm(
      KILOMETERS_GROUP_FIXTURE
    );

    await chooseBothUnits(sheet);

    expect(
      screen.queryByText(DISPATCH_SHEET_COPY.FUEL_LABEL)
    ).not.toBeInTheDocument();

    for (const unit of [FIRST, SECOND]) {
      await userEvent.type(
        sheet.getReadingUsageField(
          unit.code,
          DISPATCH_USAGE_COPY.kilometers.LABEL
        ),
        HOURS_ABOVE_LAST
      );
    }
    await userEvent.click(sheet.getSubmit());

    expect(onSubmit.mock.calls[0][0].readings).toEqual([
      { fuel: null, unitId: FIRST.unitId, usage: 13 },
      { fuel: null, unitId: SECOND.unitId, usage: 13 },
    ]);
  });

  it("asks for the reading of a unit already assigned to the reservation", () => {
    const { sheet } = renderForm({
      ...MOTOR_READINGS_GROUP_FIXTURE,
      candidateUnits: [
        {
          ...DISPATCH_FIXTURE_UNIT.ASSIGNED,
          fuelLevel: DISPATCH_FIXTURE_GAUGE.LAST_FUEL,
          usageTotal: DISPATCH_FIXTURE_GAUGE.LAST_USAGE,
        },
      ],
      fixedUnitIds: [DISPATCH_FIXTURE_UNIT.ASSIGNED.unitId],
      requiredQuantity: 0,
    });

    expect(
      sheet.getReadingFuelField(
        DISPATCH_FIXTURE_UNIT.ASSIGNED.code
      )
    ).toBeInTheDocument();
    expect(sheet.getSubmit()).toBeDisabled();
  });

  it.each([
    ["a category without motor", UNIT_GROUP_FIXTURE],
    [
      "an assigned unit without motor",
      ASSIGNED_GROUP_FIXTURE,
    ],
  ])("takes no reading for %s", async (_label, group) => {
    const { onSubmit, sheet } = renderForm(group);

    for (const unit of group.candidateUnits.slice(
      0,
      group.fixedUnitIds.length + group.requiredQuantity
    )) {
      if (!unit.isAssigned) {
        await userEvent.click(sheet.getUnit(unit.code));
      }
    }
    await userEvent.click(sheet.getSubmit());

    expect(
      screen.queryByText(
        DISPATCH_SHEET_COPY.READINGS_LEGEND
      )
    ).not.toBeInTheDocument();
    expect(onSubmit.mock.calls[0][0].readings).toEqual([]);
  });
});
