import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ARIA_ROLE,
  RESERVATION_CALENDAR_ACTIVE_STATUS,
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { resolveReservationSplitPath } from "@/app/utils/reservations/resolveReservationSplitPath";
import { renderReservationCalendarBlockActions } from "../utils/renderReservationCalendarBlockActions";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";

const HREF_ATTRIBUTE = "href";

const buildBlock = (
  status: typeof CALENDAR_BLOCK_ENTRY.status
) =>
  buildReservationCalendarBlock({
    ...CALENDAR_BLOCK_ENTRY,
    status,
  });

describe("reservation calendar block actions", (): void => {
  it("links a scheduled block to its split screen with the customer in the name", (): void => {
    const block = buildBlock(
      RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED
    );

    render(
      <>{renderReservationCalendarBlockActions(block)}</>
    );

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: [
          copy.SPLIT_RESERVATION_LABEL,
          block.customerName,
        ].join(STRING.SPACE),
      })
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      resolveReservationSplitPath(block.id)
    );
  });

  it("offers nothing on a dispatched block", (): void => {
    const block = buildBlock(
      RESERVATION_CALENDAR_ACTIVE_STATUS.DISPATCHED
    );

    expect(
      renderReservationCalendarBlockActions(block)
    ).toBeNull();
  });
});
