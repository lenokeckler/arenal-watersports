import {
  pushMock,
  setCompatibilityMock,
} from "./extraCompatibilityUnits.harness";
import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { EXTRA_COMPATIBILITY_UNIT_STATUS_COPY } from "../constants/ExtraCompatibilityUnitStatusCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import ExtraCompatibilityUnitsFormView from "../ExtraCompatibilityUnitsFormView";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import { resolveExtraCompatibilityPath } from "../utils/resolveExtraCompatibilityPath";
import { createDeferred } from "./createDeferred";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_CATEGORY_NAME,
  COMPATIBILITY_EXTRA_ID,
  COMPATIBILITY_UNITS,
  EMPTY_COMPATIBILITY_UNITS,
  FREE_COMPATIBILITY_UNIT,
  FREE_UNIT_ID,
  LINKED_COMPATIBILITY_UNIT,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";
import { createExtraCompatibilityUnitsPage } from "./ExtraCompatibilityUnits.page";
import { FAKE_EXTRA_NAME } from "./Extra.constants";
import { settleDeferred } from "./settleDeferred";

const renderView = () =>
  render(
    <ExtraCompatibilityUnitsFormView
      {...COMPATIBILITY_UNITS}
    />
  );

describe("ExtraCompatibilityUnitsFormView", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    setCompatibilityMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("titles the screen and names the extra and the category", () => {
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();

    expect(unitsPage.getTitle()).toBeInTheDocument();
    expect(
      unitsPage.getInstruction(
        FAKE_EXTRA_NAME,
        COMPATIBILITY_CATEGORY_NAME
      )
    ).toBeInTheDocument();
  });

  it.each([
    LINKED_COMPATIBILITY_UNIT,
    FREE_COMPATIBILITY_UNIT,
  ])(
    "lists the unit $code with its status word",
    (unit) => {
      renderView();

      expect(
        createExtraCompatibilityUnitsPage().queryUnitWithStatus(
          unit.code,
          EXTRA_COMPATIBILITY_UNIT_STATUS_COPY[unit.status]
        )
      ).toBeInTheDocument();
    }
  );

  it("checks the linked unit and leaves the free one unchecked", () => {
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();

    expect(
      unitsPage.getUnitCheckbox(
        LINKED_COMPATIBILITY_UNIT.code
      )
    ).toBeChecked();
    expect(
      unitsPage.getUnitCheckbox(
        FREE_COMPATIBILITY_UNIT.code
      )
    ).not.toBeChecked();
  });

  it("checks every unit with Marcar todas", async () => {
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();

    await unitsPage.selectAll();

    expect(
      unitsPage.getUnitCheckbox(
        FREE_COMPATIBILITY_UNIT.code
      )
    ).toBeChecked();
  });

  it("unchecks every unit with Quitar todas", async () => {
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();

    await unitsPage.clearAll();

    expect(
      unitsPage.getUnitCheckbox(
        LINKED_COMPATIBILITY_UNIT.code
      )
    ).not.toBeChecked();
  });

  it("keeps Guardar disabled until the selection changes", async () => {
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();

    expect(unitsPage.getSaveButton()).toBeDisabled();

    await unitsPage.toggleUnit(
      FREE_COMPATIBILITY_UNIT.code
    );

    expect(unitsPage.getSaveButton()).toBeEnabled();
  });

  it("saves the checked units of the category", async () => {
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();

    await unitsPage.toggleUnit(
      FREE_COMPATIBILITY_UNIT.code
    );
    await unitsPage.save();

    expect(setCompatibilityMock).toHaveBeenCalledWith({
      extraId: COMPATIBILITY_EXTRA_ID,
      categoryId: COMPATIBILITY_CATEGORY_ID,
      unitIds: [LINKED_UNIT_ID, FREE_UNIT_ID],
    });
  });

  it("goes back to the categories screen with Regresar without saving", async () => {
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();

    await unitsPage.toggleUnit(
      FREE_COMPATIBILITY_UNIT.code
    );
    await unitsPage.back();

    expect(pushMock).toHaveBeenCalledWith(
      resolveExtraCompatibilityPath(COMPATIBILITY_EXTRA_ID)
    );
    expect(setCompatibilityMock).not.toHaveBeenCalled();
  });

  it("locks the checklist while the save is in flight", async () => {
    const deferred = createDeferred<ExtraMutationResult>();
    setCompatibilityMock.mockReturnValue(deferred.promise);
    renderView();
    const unitsPage = createExtraCompatibilityUnitsPage();
    await unitsPage.toggleUnit(
      FREE_COMPATIBILITY_UNIT.code
    );

    await unitsPage.save();

    expect(
      unitsPage.getUnitCheckbox(
        FREE_COMPATIBILITY_UNIT.code
      )
    ).toBeDisabled();

    await settleDeferred(deferred, {
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("says the category has no active units when it has none", () => {
    render(
      <ExtraCompatibilityUnitsFormView
        {...EMPTY_COMPATIBILITY_UNITS}
      />
    );

    expect(
      createExtraCompatibilityUnitsPage().queryEmptyMessage()
    ).toBeInTheDocument();
  });
});
