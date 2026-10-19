import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import ReservationCategoryAvailabilityPanel from "../components/ReservationCategoryAvailabilityPanel";
import { createReservationCategoryAvailabilityPanelPage } from "./ReservationCategoryAvailabilityPanel.page";
import {
  RESERVATION_CATEGORY_AVAILABILITY_PANEL_CASES,
  RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST,
} from "./ReservationCategoryAvailabilityPanel.constants";

describe("ReservationCategoryAvailabilityPanel result states", () => {
  it.each(RESERVATION_CATEGORY_AVAILABILITY_PANEL_CASES)(
    "shows the exact free count $freeEquipmentCount",
    ({ freeEquipmentCount, state }) => {
      const page =
        createReservationCategoryAvailabilityPanelPage();
      render(
        <ReservationCategoryAvailabilityPanel
          categoryName={
            RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.CATEGORY_NAME
          }
          freeEquipmentCount={freeEquipmentCount}
          intervalLabel={
            RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.INTERVAL_LABEL
          }
          onRetry={vi.fn()}
          state={state}
        />
      );

      expect(
        page.getAvailabilityCount(freeEquipmentCount)
      ).toBeInTheDocument();
    }
  );

  it("provides a retry action after a query error", async () => {
    const onRetry = vi.fn();
    const page =
      createReservationCategoryAvailabilityPanelPage();
    render(
      <ReservationCategoryAvailabilityPanel
        categoryName={
          RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.CATEGORY_NAME
        }
        freeEquipmentCount={null}
        intervalLabel={
          RESERVATION_CATEGORY_AVAILABILITY_PANEL_TEST.INTERVAL_LABEL
        }
        onRetry={onRetry}
        state={
          RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.ERROR
        }
      />
    );

    await page.clickRetry();

    expect(onRetry).toHaveBeenCalledOnce();
    expect(page.getAlert()).toHaveTextContent(
      RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_ERROR
    );
  });
});
