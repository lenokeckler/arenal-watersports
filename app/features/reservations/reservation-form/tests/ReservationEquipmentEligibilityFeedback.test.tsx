import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ReservationEquipmentEligibilityFeedback from "../components/ReservationEquipmentEligibilityFeedback";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_EQUIPMENT_FEEDBACK_VIEW_MODEL } from "./ReservationEquipmentEligibilityFeedback.constants";

describe("ReservationEquipmentEligibilityFeedback", () => {
  it("shows progress while eligibility refreshes", () => {
    render(
      <ReservationEquipmentEligibilityFeedback
        categories={[]}
        viewModel={{
          ...RESERVATION_EQUIPMENT_FEEDBACK_VIEW_MODEL,
          isEquipmentEligibilityLoading: true,
        }}
      />
    );

    expect(
      screen.getByText(
        RESERVATION_FORM_UI_COPY.EQUIPMENT_ELIGIBILITY_LOADING
      )
    ).toBeInTheDocument();
  });

  it("offers retry when eligibility refresh fails", async () => {
    const retry = vi.fn();
    const user = userEvent.setup();
    render(
      <ReservationEquipmentEligibilityFeedback
        categories={[]}
        viewModel={{
          ...RESERVATION_EQUIPMENT_FEEDBACK_VIEW_MODEL,
          hasEquipmentEligibilityError: true,
          handleRetryEquipmentEligibility: retry,
        }}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: RESERVATION_FORM_UI_COPY.RETRY_EQUIPMENT_ELIGIBILITY,
      })
    );

    expect(retry).toHaveBeenCalledOnce();
    expect(screen.getByRole("alert")).toHaveTextContent(
      RESERVATION_FORM_UI_COPY.EQUIPMENT_ELIGIBILITY_ERROR
    );
  });
});
