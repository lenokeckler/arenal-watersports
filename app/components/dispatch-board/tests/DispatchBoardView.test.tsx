import { render } from "@testing-library/react";
import { DISPATCH_BOARD_COPY } from "../constants/DispatchBoard.constants";
import { DispatchBoardView } from "../DispatchBoardView";
import { createDispatchBoardPage } from "./DispatchBoard.page";
import { PENDING_RESERVATION_FIXTURE } from "./DispatchBoardTest.constants";

describe("DispatchBoardView", () => {
  it("shows pending reservations and the next page when available", () => {
    render(
      <DispatchBoardView
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
});
