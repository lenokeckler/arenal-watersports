import { STRING } from "@/app/constants";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { ReservationCalendarBlock } from "@/app/components/reservation-calendar/components/ReservationCalendarBlock";
import type { ReservationCalendarBlock as Block } from "@/app/components/reservation-calendar/models/ReservationCalendarBlock.interface";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { createReservationCalendarBlockPage } from "./ReservationCalendarBlock.page";
import { RESERVATION_BLOCK_TEST } from "./ReservationCalendarBlock.constants";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";

afterEach(cleanup);

const renderBlock = (block: Block) => {
  render(<ReservationCalendarBlock block={block} />);
  return createReservationCalendarBlockPage(block);
};

describe("reservation equipment imagery", (): void => {
  it("renders an image for a known equipment category", (): void => {
    const block = buildReservationCalendarBlock({
      ...CALENDAR_BLOCK_ENTRY,
      dispatches: [],
      equipment: [
        {
          categoryId:
            RESERVATION_BLOCK_TEST.KNOWN_EQUIPMENT_CATEGORY_ID,
          categoryName:
            RESERVATION_BLOCK_TEST.KNOWN_EQUIPMENT_CATEGORY,
          quantity:
            RESERVATION_BLOCK_TEST.EQUIPMENT_QUANTITY,
          unitCode: null,
        },
      ],
    });

    const page = renderBlock(block);
    const images = page.getEquipmentImages();
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("alt", STRING.Empty);
    expect(block.equipmentCategoryName).toBe(
      RESERVATION_BLOCK_TEST.KNOWN_EQUIPMENT_CATEGORY
    );
    expect(block.equipmentLabel).not.toBe(
      block.equipmentCategoryName
    );
    expect(
      page.getText(block.equipmentLabel)
    ).toBeInTheDocument();
  });

  it("omits an image for an unknown equipment category", (): void => {
    const block = buildReservationCalendarBlock({
      ...CALENDAR_BLOCK_ENTRY,
      dispatches: [],
      equipment: [
        {
          categoryId:
            RESERVATION_BLOCK_TEST.KNOWN_EQUIPMENT_CATEGORY_ID,
          categoryName:
            RESERVATION_BLOCK_TEST.UNKNOWN_EQUIPMENT_CATEGORY,
          quantity:
            RESERVATION_BLOCK_TEST.EQUIPMENT_QUANTITY,
          unitCode: null,
        },
      ],
    });

    expect(
      renderBlock(block).getEquipmentImages()
    ).toHaveLength(0);
  });
});
