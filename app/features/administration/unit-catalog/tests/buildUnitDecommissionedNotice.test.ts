import { describe, expect, it } from "vitest";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import { buildUnitDecommissionedNotice } from "../utils/buildUnitDecommissionedNotice";
import { DEFAULT_UNIT } from "./Unit.constants";
import {
  DECOMMISSIONED_UNIT,
  EXPECTED_DATE_TEXT,
  FAKE_DECOMMISSION_REASON,
} from "./UnitDecommissionNotice.constants";

describe("buildUnitDecommissionedNotice", () => {
  it("is null for a unit that was not decommissioned", () => {
    expect(
      buildUnitDecommissionedNotice(DEFAULT_UNIT)
    ).toBeNull();
  });

  it("states the Costa Rica date and the reason", () => {
    const notice = buildUnitDecommissionedNotice(
      DECOMMISSIONED_UNIT
    );

    expect(notice).toContain(
      UNIT_DECOMMISSION_COPY.DECOMMISSIONED_NOTICE_PREFIX
    );
    expect(notice).toContain(EXPECTED_DATE_TEXT);
    expect(notice).toContain(FAKE_DECOMMISSION_REASON);
  });
});
