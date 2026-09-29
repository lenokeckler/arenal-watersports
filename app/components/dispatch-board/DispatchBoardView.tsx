import { COSTA_RICA, TitleVariant } from "@/app/constants";
import Link from "@/app/components/link/Link";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  DISPATCH_BOARD_COPY,
  DISPATCH_BOARD_DATE_FORMAT,
  DISPATCH_BOARD_HEADING_ID,
} from "./constants/DispatchBoard.constants";
import type { DispatchBoardContentProps } from "./models/DispatchBoardContentProps.interface";
import type { DispatchBoardPaginationProps } from "./models/DispatchBoardPaginationProps.interface";
import type { ReservationListProps } from "./models/ReservationListProps.interface";
import type { ReservationRowProps } from "./models/ReservationRowProps.interface";
import type { JSX } from "react";
import {
  DISPATCH_BOARD_CLASS,
  DISPATCH_BOARD_HEADING_CLASS,
  DISPATCH_BOARD_LIST_CLASS,
  DISPATCH_BOARD_MESSAGE_CLASS,
  DISPATCH_BOARD_PAGINATION_CLASS,
  DISPATCH_BOARD_PAGINATION_LINK_CLASS,
  DISPATCH_BOARD_RESERVATION_CLASS,
  DISPATCH_BOARD_RESERVATION_HEADING_CLASS,
  DISPATCH_BOARD_RESERVATION_TIME_CLASS,
  DISPATCH_BOARD_SECTION_CLASS,
} from "./styles/DispatchBoard.styles";
import { getDispatchPageHref } from "./utils/getDispatchPageHref";

const formatReservationTime = (startsAt: string): string =>
  new Intl.DateTimeFormat(COSTA_RICA.LOCALE, {
    hour: DISPATCH_BOARD_DATE_FORMAT.HOUR,
    minute: DISPATCH_BOARD_DATE_FORMAT.MINUTE,
    timeZone: COSTA_RICA.TIME_ZONE,
  }).format(new Date(startsAt));

const ReservationRow = ({
  reservation,
}: ReservationRowProps): JSX.Element => (
  <li className={DISPATCH_BOARD_RESERVATION_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={`${reservation.customer_name}${DISPATCH_BOARD_COPY.RESERVATION_SEPARATOR}${reservation.code}`}
      className={DISPATCH_BOARD_RESERVATION_HEADING_CLASS}
    />
    <Text className={DISPATCH_BOARD_RESERVATION_TIME_CLASS}>
      {formatReservationTime(reservation.starts_at)}
    </Text>
  </li>
);

const ReservationList = ({
  reservations,
}: ReservationListProps): JSX.Element => (
  <ul className={DISPATCH_BOARD_LIST_CLASS}>
    {reservations.map((reservation) => (
      <ReservationRow
        key={reservation.id}
        reservation={reservation}
      />
    ))}
  </ul>
);

const DispatchBoardPagination = ({
  hasNextPage,
  page,
}: DispatchBoardPaginationProps): JSX.Element => (
  <nav
    aria-label={DISPATCH_BOARD_COPY.PAGE_LABEL}
    className={DISPATCH_BOARD_PAGINATION_CLASS}
  >
    {page > 1 ? (
      <Link
        className={DISPATCH_BOARD_PAGINATION_LINK_CLASS}
        href={getDispatchPageHref(page - 1)}
      >
        {DISPATCH_BOARD_COPY.PREVIOUS_PAGE}
      </Link>
    ) : (
      <span />
    )}
    {hasNextPage && (
      <Link
        className={DISPATCH_BOARD_PAGINATION_LINK_CLASS}
        href={getDispatchPageHref(page + 1)}
      >
        {DISPATCH_BOARD_COPY.NEXT_PAGE}
      </Link>
    )}
  </nav>
);

export const DispatchBoardView = ({
  hasNextPage,
  page,
  reservations,
}: DispatchBoardContentProps): JSX.Element => (
  <main className={DISPATCH_BOARD_CLASS}>
    <Section
      ariaLabel={DISPATCH_BOARD_HEADING_ID}
      className={DISPATCH_BOARD_SECTION_CLASS}
    >
      <Title
        id={DISPATCH_BOARD_HEADING_ID}
        variant={TitleVariant.PRIMARY}
        text={DISPATCH_BOARD_COPY.HEADING}
        className={DISPATCH_BOARD_HEADING_CLASS}
      />
      {reservations.length === 0 ? (
        <Text className={DISPATCH_BOARD_MESSAGE_CLASS}>
          {DISPATCH_BOARD_COPY.EMPTY}
        </Text>
      ) : (
        <ReservationList reservations={reservations} />
      )}
      <DispatchBoardPagination
        hasNextPage={hasNextPage}
        page={page}
      />
    </Section>
  </main>
);
