"use client";

import ListPagination from "@/app/components/list-pagination/ListPagination";
import Section from "@/app/components/section/Section";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import UnitReservationHistoryBody from "./components/UnitReservationHistoryBody";
import { UNIT_RESERVATION_HISTORY_COPY } from "./constants/UnitReservationHistoryCopy.constants";
import { UNIT_RESERVATION_HISTORY_TITLE_ID } from "./constants/UnitReservationHistoryId.constants";
import { useUnitReservationHistoryViewModel } from "./hooks/useUnitReservationHistoryViewModel";
import type { UnitReservationHistoryViewProps } from "./models/UnitReservationHistoryViewProps.interface";
import {
  UNIT_RESERVATION_HISTORY_SECTION_CLASS,
  UNIT_RESERVATION_HISTORY_TITLE_CLASS,
} from "./styles/UnitReservationHistory.styles";

const UnitReservationHistoryView = ({
  basePath,
  currentPage,
  fetchFailed,
  pageCount,
  reservations,
}: UnitReservationHistoryViewProps): React.JSX.Element => {
  const { onRetry, rows, viewState } =
    useUnitReservationHistoryViewModel({
      fetchFailed,
      reservations,
    });

  return (
    <Section
      ariaLabel={UNIT_RESERVATION_HISTORY_TITLE_ID}
      className={UNIT_RESERVATION_HISTORY_SECTION_CLASS}
    >
      <Title
        variant={TitleVariant.SECONDARY}
        id={UNIT_RESERVATION_HISTORY_TITLE_ID}
        text={UNIT_RESERVATION_HISTORY_COPY.TITLE}
        className={UNIT_RESERVATION_HISTORY_TITLE_CLASS}
      />
      <UnitReservationHistoryBody
        onRetry={onRetry}
        rows={rows}
        viewState={viewState}
      />
      <ListPagination
        basePath={basePath}
        navLabel={
          UNIT_RESERVATION_HISTORY_COPY.PAGINATION_NAV_LABEL
        }
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </Section>
  );
};

export default UnitReservationHistoryView;
