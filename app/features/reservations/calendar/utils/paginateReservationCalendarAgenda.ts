import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import type { ReservationCalendarContent } from "@/app/components/reservation-calendar/models/ReservationCalendarContent.interface";
import type { ReservationCalendarDayGroup } from "@/app/components/reservation-calendar/models/ReservationCalendarDayGroup.interface";
import type { ReservationCalendarAgendaPage } from "../models/ReservationCalendarAgendaPage.interface";

const getUniqueBlocks = (
  groups: readonly ReservationCalendarDayGroup[]
) => {
  const blocks = new Map(
    groups.flatMap((group) =>
      group.blocks.map(
        (block) => [block.id, block] as const
      )
    )
  );
  return [...blocks.values()];
};

export const paginateReservationCalendarAgenda = (
  content: ReservationCalendarContent,
  requestedPage: number,
  pageSize: number
): ReservationCalendarAgendaPage => {
  const uniqueBlocks = getUniqueBlocks(content.groups);
  const totalCount = uniqueBlocks.length;
  const pageCount = Math.ceil(totalCount / pageSize);
  const page = Math.min(
    Math.max(
      RESERVATION_CALENDAR_LIST.FIRST_PAGE,
      requestedPage
    ),
    Math.max(
      RESERVATION_CALENDAR_LIST.FIRST_PAGE,
      pageCount
    )
  );
  const startIndex = (page - 1) * pageSize;
  const pageIds = new Set(
    uniqueBlocks
      .slice(startIndex, startIndex + pageSize)
      .map((block) => block.id)
  );
  const groups = content.groups
    .map((group) => ({
      ...group,
      blocks: group.blocks.filter((block) =>
        pageIds.has(block.id)
      ),
    }))
    .filter((group) => group.blocks.length > 0);
  return { groups, page, pageCount, totalCount };
};
