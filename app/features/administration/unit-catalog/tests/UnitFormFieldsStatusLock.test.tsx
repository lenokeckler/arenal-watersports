import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UnitFormFields from "../components/UnitFormFields";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import { DEFAULT_UNIT_FORM_VALUES } from "./Unit.constants";
import { buildUnitCategory } from "./UnitList.constants";

const renderFields = (isStatusLocked: boolean): void => {
  render(
    <UnitFormFields
      values={DEFAULT_UNIT_FORM_VALUES}
      errors={{}}
      category={buildUnitCategory()}
      isDisabled={false}
      isStatusLocked={isStatusLocked}
      onCodeChange={vi.fn()}
      onStatusChange={vi.fn()}
      onFuelMaxChange={vi.fn()}
      onFuelLevelChange={vi.fn()}
      onUsageTotalChange={vi.fn()}
      onNextOilChangeAtChange={vi.fn()}
    />
  );
};

describe("UnitFormFields status lock", () => {
  it("disables the status select while the unit is occupied", () => {
    renderFields(true);

    expect(
      screen.getByLabelText(UNIT_FORM_COPY.STATUS_LABEL)
    ).toBeDisabled();
  });

  it("keeps the status select editable otherwise", () => {
    renderFields(false);

    expect(
      screen.getByLabelText(UNIT_FORM_COPY.STATUS_LABEL)
    ).toBeEnabled();
  });
});
