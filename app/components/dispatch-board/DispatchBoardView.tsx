import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import UnorderedList from "@/app/components/list/UnorderedList";
import Link from "@/app/components/link/Link";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  DISPATCH_BOARD_COPY,
  DISPATCH_BOARD_HEADING_ID,
  DISPATCH_BOARD_PAGINATION,
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
  DISPATCH_BOARD_PAGINATION_NEXT_LINK_CLASS,
  DISPATCH_BOARD_RESERVATION_CLASS,
  DISPATCH_BOARD_RESERVATION_HEADING_CLASS,
  DISPATCH_BOARD_RESERVATION_TIME_CLASS,
  DISPATCH_BOARD_SECTION_CLASS,
} from "./styles/DispatchBoard.styles";
import DispatchReservationAction from "./components/DispatchReservationAction";
import { formatCostaRicaTime } from "./utils/formatCostaRicaTime";
import { getDispatchPageHref } from "./utils/getDispatchPageHref";

const ReservationRow = ({
  reservation,
}: ReservationRowProps): JSX.Element => (
  <div className={DISPATCH_BOARD_RESERVATION_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={`${reservation.customer_name}${DISPATCH_BOARD_COPY.RESERVATION_SEPARATOR}${reservation.code}`}
      className={DISPATCH_BOARD_RESERVATION_HEADING_CLASS}
    />
    <Text className={DISPATCH_BOARD_RESERVATION_TIME_CLASS}>
      {formatCostaRicaTime(reservation.starts_at)}
    </Text>
    <DispatchReservationAction
      customerName={reservation.customer_name}
      reservationId={reservation.id}
    />
  </div>
);

const ReservationList = ({
  reservations,
}: ReservationListProps): JSX.Element => (
  <UnorderedList
    className={DISPATCH_BOARD_LIST_CLASS}
    items={reservations.map((reservation) => ({
      id: reservation.id,
      text: <ReservationRow reservation={reservation} />,
    }))}
  />
);

const DispatchBoardPagination = ({
  hasNextPage,
  page,
}: DispatchBoardPaginationProps): JSX.Element => (
  <nav
    aria-label={DISPATCH_BOARD_COPY.PAGE_LABEL}
    className={DISPATCH_BOARD_PAGINATION_CLASS}
  >
    {page > DISPATCH_BOARD_PAGINATION.FIRST_PAGE && (
      <Link
        className={DISPATCH_BOARD_PAGINATION_LINK_CLASS}
        href={getDispatchPageHref(page - 1)}
      >
        {DISPATCH_BOARD_COPY.PREVIOUS_PAGE}
      </Link>
    )}
    {hasNextPage && (
      <Link
        className={
          DISPATCH_BOARD_PAGINATION_NEXT_LINK_CLASS
        }
        href={getDispatchPageHref(page + 1)}
      >
        {DISPATCH_BOARD_COPY.NEXT_PAGE}
      </Link>
    )}
  </nav>
);

export const DispatchBoardView = ({
  errorMessage,
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
      {errorMessage && (
        <Text
          className={DISPATCH_BOARD_MESSAGE_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          {errorMessage}
        </Text>
      )}
      {!errorMessage && reservations.length === 0 && (
        <Text className={DISPATCH_BOARD_MESSAGE_CLASS}>
          {DISPATCH_BOARD_COPY.EMPTY}
        </Text>
      )}
      {!errorMessage && reservations.length > 0 && (
        <ReservationList reservations={reservations} />
      )}
      {!errorMessage && (
        <DispatchBoardPagination
          hasNextPage={hasNextPage}
          page={page}
        />
      )}
    </Section>
  </main>
);
