import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DISPATCH_BOARD_COPY } from "../constants/DispatchBoard.constants";
import { DispatchBoardView } from "../DispatchBoardView";
import { createDispatchBoardPage } from "./DispatchBoard.page";
import { PENDING_RESERVATION_FIXTURE } from "./DispatchBoardTest.constants";

describe("DispatchBoardView", () => {
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
