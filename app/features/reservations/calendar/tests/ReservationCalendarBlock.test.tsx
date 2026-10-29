import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import { ReservationCalendarBlock } from "../components/ReservationCalendarBlock";
import type { ReservationCalendarBlock as Block } from "../models/ReservationCalendarBlock.interface";
import { buildReservationCalendarBlock } from "../utils/buildReservationCalendarBlock";
import type { ReservationCalendarBlockPage } from "./models/ReservationCalendarBlockPage.interface";
import { createReservationCalendarBlockPage } from "./ReservationCalendarBlock.page";
import { CALENDAR_RESERVATION } from "./ReservationCalendar.constants";
import {
  CALENDAR_BLOCK_ENTRY,
  CALENDAR_BLOCK_EXPECTED,
} from "./ReservationCalendarDisplay.constants";

afterEach(cleanup);

const renderBlock = (
  block: Block
): ReservationCalendarBlockPage => {
  render(<ReservationCalendarBlock block={block} />);
  return createReservationCalendarBlockPage(block);
};

describe("complete static reservation information", (): void => {
  it("renders full customer, committed equipment and booked schedule", (): void => {
    const block = buildReservationCalendarBlock(
      CALENDAR_BLOCK_ENTRY
    );
    const page = renderBlock(block);
    expect(
      page.getText(CALENDAR_BLOCK_ENTRY.customerName)
    ).toBeVisible();
    expect(
      page.getText(CALENDAR_BLOCK_EXPECTED.EQUIPMENT)
    ).toBeVisible();
    expect(
      page.getText(CALENDAR_BLOCK_EXPECTED.SCHEDULED)
    ).toBeVisible();
  });
  it("renders every actual departure group including unknown returns", (): void => {
    const page = renderBlock(
      buildReservationCalendarBlock(CALENDAR_BLOCK_ENTRY)
    );
    for (const label of CALENDAR_BLOCK_EXPECTED.ACTUAL_LABELS) {
      expect(page.getText(label)).toBeVisible();
    }
  });
});

describe("reservation block accessibility", (): void => {
  it("exposes the exact complete descriptor as its accessible name", (): void => {
    const block = buildReservationCalendarBlock(
      CALENDAR_BLOCK_ENTRY
    );
    expect(
      renderBlock(block).getBlock()
    ).toHaveAccessibleName(block.accessibleLabel);
  });
  it("remains static without links, controls or tab stops", (): void => {
    const page = renderBlock(
      buildReservationCalendarBlock(CALENDAR_BLOCK_ENTRY)
    );
    expect(page.getFocusableElements()).toEqual([]);
  });
});

describe("reservation block missing information", (): void => {
  it("keeps missing equipment explicit without requiring departure groups", (): void => {
    const block = buildReservationCalendarBlock({
      ...CALENDAR_BLOCK_ENTRY,
      equipment: [],
      dispatches: [],
    });
    const page = renderBlock(block);
    expect(
      page.getText(
        RESERVATIONS_CALENDAR_COPY.MISSING_EQUIPMENT
      )
    ).toBeVisible();
    expect(page.getText(block.customerName)).toBeVisible();
    expect(page.getBlock()).toHaveAccessibleName(
      block.accessibleLabel
    );
  });
  it("preserves legitimate repeated group descriptions", (): void => {
    const label = CALENDAR_BLOCK_EXPECTED.ACTUAL_LABELS[0];
    const firstGroup = CALENDAR_BLOCK_ENTRY.dispatches[0];
    const block = buildReservationCalendarBlock({
      ...CALENDAR_BLOCK_ENTRY,
      dispatches: [
        firstGroup,
        { ...firstGroup, id: CALENDAR_BLOCK_ENTRY.id },
      ],
    });
    const page = renderBlock(block);
    expect(page.getTexts(label)).toHaveLength(
      block.actualLabels.length
    );
  });
});

describe("reservation descriptor replacement", (): void => {
  it("updates its accessible name and visible facts without retaining old equipment or groups", (): void => {
    const original = buildReservationCalendarBlock(
      CALENDAR_BLOCK_ENTRY
    );
    const updated = buildReservationCalendarBlock({
      ...CALENDAR_BLOCK_ENTRY,
      customerName: CALENDAR_RESERVATION.customer_name,
      equipment: [],
      dispatches: [],
    });
    const { rerender } = render(
      <ReservationCalendarBlock block={original} />
    );

    rerender(<ReservationCalendarBlock block={updated} />);

    const page =
      createReservationCalendarBlockPage(updated);
    expect(page.getBlock()).toHaveAccessibleName(
      updated.accessibleLabel
    );
    expect(
      page.getText(updated.customerName)
    ).toBeVisible();
    expect(
      page.getText(updated.equipmentLabel)
    ).toBeVisible();
    expect(page.getBlock()).not.toHaveTextContent(
      original.customerName
    );
    expect(page.getBlock()).not.toHaveTextContent(
      original.equipmentLabel
    );
    for (const label of original.actualLabels) {
      expect(page.getBlock()).not.toHaveTextContent(label);
    }
  });
});
