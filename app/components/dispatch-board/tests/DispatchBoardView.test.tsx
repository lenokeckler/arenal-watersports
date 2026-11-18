import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { DISPATCH_BOARD_COPY } from "../constants/DispatchBoard.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

import { DispatchBoardView } from "../DispatchBoardView";
import { createDispatchBoardPage } from "./DispatchBoard.page";
import {
  COMBO_RESERVATION_FIXTURE,
  PARTIAL_RESERVATION_FIXTURE,
  PENDING_RESERVATION_FIXTURE,
} from "./DispatchBoardTest.constants";

describe("DispatchBoardView", () => {
  it("tags a combo and leaves a plain reservation without the tag", () => {
    render(
      <DispatchBoardView
        errorMessage={null}
        hasNextPage={false}
        page={1}
        reservations={[
          PENDING_RESERVATION_FIXTURE,
          COMBO_RESERVATION_FIXTURE,
        ]}
      />
    );

    expect(
      screen.getAllByText(DISPATCH_BOARD_COPY.COMBO_TAG)
    ).toHaveLength(1);
  });

  it("says how many are left of a reservation that already sent part of its equipment", () => {
    render(
      <DispatchBoardView
        errorMessage={null}
        hasNextPage={false}
        page={1}
        reservations={[PARTIAL_RESERVATION_FIXTURE]}
      />
    );

    expect(
      screen.getByText(
        DISPATCH_BOARD_COPY.MISSING("Jet ski", 1, 2)
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /caduca a las \d{2}:\d{2} si no llegan/
      )
    ).toBeInTheDocument();
  });

  it("marks the reservation the office sent to the dock and no other", () => {
    render(
      <DispatchBoardView
        errorMessage={null}
        hasNextPage={false}
        page={1}
        reservations={[
          PENDING_RESERVATION_FIXTURE,
          PARTIAL_RESERVATION_FIXTURE,
        ]}
      />
    );

    expect(
      screen.getAllByText(DISPATCH_BOARD_COPY.DOCK_TAG)
    ).toHaveLength(1);
  });

  it("does not talk about expiry when nothing was sent yet", () => {
    render(
      <DispatchBoardView
        errorMessage={null}
        hasNextPage={false}
        page={1}
        reservations={[PENDING_RESERVATION_FIXTURE]}
      />
    );

    expect(
      screen.queryByText(/caduca/)
    ).not.toBeInTheDocument();
  });

  it("shows pending reservations and the next page when available", () => {
    render(
      <DispatchBoardView
        errorMessage={null}
        hasNextPage
        page={1}
        reservations={[PENDING_RESERVATION_FIXTURE]}
      />
    );
    const dispatchBoardPage = createDispatchBoardPage();

    expect(
      dispatchBoardPage.getHeading()
    ).toBeInTheDocument();
    expect(
      dispatchBoardPage.getReservation(
        PENDING_RESERVATION_FIXTURE.code
      )
    ).toHaveTextContent(
      PENDING_RESERVATION_FIXTURE.customer_name
    );
    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: DISPATCH_BOARD_COPY.EQUIPMENT_LABEL,
      })
    ).toHaveTextContent("Jet ski × 2");
    expect(
      screen.getByText("Kayak doble × 1")
    ).toBeInTheDocument();
    expect(
      dispatchBoardPage.getNextPageLink()
    ).toHaveAttribute(
      "href",
      dispatchBoardPage.getNextPageHref()
    );
  });

  it("shows an empty state when there are no pending reservations", () => {
    render(
      <DispatchBoardView
        errorMessage={null}
        hasNextPage={false}
        page={1}
        reservations={[]}
      />
    );
    const dispatchBoardPage = createDispatchBoardPage();

    expect(
      dispatchBoardPage.getEmptyMessage()
    ).toHaveTextContent(DISPATCH_BOARD_COPY.EMPTY);
  });

  it("shows the forbidden message when access is denied", () => {
    render(
      <DispatchBoardView
        errorMessage={DISPATCH_BOARD_COPY.FORBIDDEN}
        hasNextPage={false}
        page={1}
        reservations={[]}
      />
    );
    const dispatchBoardPage = createDispatchBoardPage();

    expect(
      dispatchBoardPage.getForbiddenMessage()
    ).toHaveTextContent(DISPATCH_BOARD_COPY.FORBIDDEN);
  });
});
