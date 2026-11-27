import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import EquipmentHubView from "../EquipmentHubView";
import { EQUIPMENT_HUB_COPY } from "../constants/EquipmentHubCopy.constants";
import { countWaitingMaintenance } from "../utils/countWaitingMaintenance";
import { HUB_DATA } from "./EquipmentHub.constants";

const getLink = (name: RegExp | string) =>
  screen.getByRole(ARIA_ROLE.LINK, { name });

describe("EquipmentHubView", () => {
  afterEach(cleanup);

  it("opens damage, photos and maintenance with what is waiting", () => {
    render(
      <EquipmentHubView
        currency="CRC"
        data={HUB_DATA}
        errorMessage={null}
      />
    );

    expect(
      getLink(
        new RegExp(EQUIPMENT_HUB_COPY.DAMAGE_PENDING(1))
      )
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORTS
    );
    expect(
      getLink(
        new RegExp(EQUIPMENT_HUB_COPY.PHOTOS_MISSING(4))
      )
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.UNIT_PHOTOS_ROOT
    );
    expect(
      getLink(
        new RegExp(
          EQUIPMENT_HUB_COPY.MAINTENANCE_WAITING(2)
        )
      )
    ).toHaveAttribute("href", PATHS.OPERATIONS.MAINTENANCE);
  });

  it("links each chart to its detail", () => {
    render(
      <EquipmentHubView
        currency="USD"
        data={HUB_DATA}
        errorMessage={null}
      />
    );

    expect(
      getLink(EQUIPMENT_HUB_COPY.SEE_SUMMARY)
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.MAINTENANCE_SUMMARY("2026-11", "USD")
    );
    expect(getLink(/^Choque: 1$/)).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORTS_BY_CAUSE("collision")
    );
  });

  it("counts a machine once for oil or for being out of service", () => {
    expect(
      countWaitingMaintenance([
        { oil_warning: true, status: "available" },
        { oil_warning: true, status: "damaged" },
        { oil_warning: false, status: "available" },
      ])
    ).toBe(2);
  });

  it("shows the error instead of the screen", () => {
    render(
      <EquipmentHubView
        currency="CRC"
        data={null}
        errorMessage={EQUIPMENT_HUB_COPY.FORBIDDEN}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(EQUIPMENT_HUB_COPY.FORBIDDEN);
  });
});
