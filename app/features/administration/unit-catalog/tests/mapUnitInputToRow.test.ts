import { describe, expect, it } from "vitest";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import { mapCreateUnitInputToRow } from "../utils/mapCreateUnitInputToRow";
import { mapDecommissionUnitInputToRow } from "../utils/mapDecommissionUnitInputToRow";
import { mapUpdateUnitInputToRow } from "../utils/mapUpdateUnitInputToRow";
import {
  buildCreateUnitInput,
  buildUpdateUnitInput,
  DEFAULT_DECOMMISSION_UNIT_INPUT,
  FAKE_CATEGORY_ID,
  FAKE_DECOMMISSIONED_AT,
  FAKE_UNIT_ADMIN_WORKER_ID,
  UNIT_INSERT_COLUMNS,
  UNIT_ROW_COLUMNS,
} from "./Unit.constants";

const NO_READINGS = {
  fuelLevel: null,
  nextOilChangeAt: null,
};

describe("mapCreateUnitInputToRow", () => {
  it("carries the category and stamps both audit columns", () => {
    const row = mapCreateUnitInputToRow(
      buildCreateUnitInput(),
      FAKE_UNIT_ADMIN_WORKER_ID
    );

    expect(Object.keys(row).sort()).toEqual(
      UNIT_INSERT_COLUMNS
    );
    expect(row).toMatchObject({
      category_id: FAKE_CATEGORY_ID,
      created_by: FAKE_UNIT_ADMIN_WORKER_ID,
      updated_by: FAKE_UNIT_ADMIN_WORKER_ID,
    });
  });

  it("writes explicit nulls for the missing readings", () => {
    expect(
      mapCreateUnitInputToRow(
        buildCreateUnitInput(NO_READINGS),
        FAKE_UNIT_ADMIN_WORKER_ID
      )
    ).toMatchObject({
      fuel_level: null,
      next_oil_change_at: null,
    });
  });
});

describe("mapUpdateUnitInputToRow", () => {
  it("sends only the editable columns and the signer", () => {
    const row = mapUpdateUnitInputToRow(
      buildUpdateUnitInput(NO_READINGS),
      FAKE_UNIT_ADMIN_WORKER_ID
    );

    expect(Object.keys(row).sort()).toEqual(
      UNIT_ROW_COLUMNS
    );
    expect(row).toMatchObject({
      fuel_level: null,
      next_oil_change_at: null,
      updated_by: FAKE_UNIT_ADMIN_WORKER_ID,
    });
  });
});

describe("mapDecommissionUnitInputToRow", () => {
  it("sets the status, the date and the trimmed reason together", () => {
    expect(
      mapDecommissionUnitInputToRow(
        DEFAULT_DECOMMISSION_UNIT_INPUT,
        FAKE_UNIT_ADMIN_WORKER_ID,
        FAKE_DECOMMISSIONED_AT
      )
    ).toEqual({
      status: UNIT_STATUS.DECOMMISSIONED,
      decommissioned_at:
        FAKE_DECOMMISSIONED_AT.toISOString(),
      decommission_reason:
        DEFAULT_DECOMMISSION_UNIT_INPUT.reason.trim(),
      updated_by: FAKE_UNIT_ADMIN_WORKER_ID,
    });
  });
});
