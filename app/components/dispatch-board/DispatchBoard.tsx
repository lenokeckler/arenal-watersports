import { DISPATCH_BOARD_COPY } from "./constants/DispatchBoard.constants";
import type { PendingDispatchReservation } from "./models/PendingDispatchReservation.interface";
import type { DispatchBoardProps } from "./models/DispatchBoardProps.interface";
import {
  getPendingDispatchReservations,
  OperationsAccessError,
} from "@/app/services/operations/getPendingDispatchReservations";
import {
  DISPATCH_BOARD_CLASS,
  DISPATCH_BOARD_HEADING_CLASS,
  DISPATCH_BOARD_MESSAGE_CLASS,
  DISPATCH_BOARD_SECTION_CLASS,
} from "./styles/DispatchBoard.styles";
import { TitleVariant } from "@/app/constants";
import Section from "@/app/components/section/Section";
import Title from "@/app/components/title/Title";
import Text from "@/app/components/text/Text";
import { DispatchBoardView } from "./DispatchBoardView";
import { DISPATCH_BOARD_HEADING_ID } from "./constants/DispatchBoard.constants";
import type { JSX } from "react";

const DispatchBoard = async ({
  page,
}: DispatchBoardProps): Promise<JSX.Element> => {
  let reservations: PendingDispatchReservation[];
  let hasNextPage = false;

  try {
    const result =
      await getPendingDispatchReservations(page);
    reservations = result.reservations;
    hasNextPage = result.hasNextPage;
  } catch (error) {
    const message =
      error instanceof OperationsAccessError
        ? DISPATCH_BOARD_COPY.FORBIDDEN
        : DISPATCH_BOARD_COPY.ERROR;

    return (
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
          <Text
            className={DISPATCH_BOARD_MESSAGE_CLASS}
            role="alert"
          >
            {message}
          </Text>
        </Section>
      </main>
    );
  }

  return (
    <DispatchBoardView
      hasNextPage={hasNextPage}
      page={page}
      reservations={reservations}
    />
  );
};

export default DispatchBoard;
