import Section from "@/app/components/section/Section";
import { RESERVATION_DETAIL_COPY as copy } from "../constants/ReservationDetailCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_OVERVIEW_CLASS } from "../styles/ReservationDetail.styles";
import { createReservationDetailOverviewEntries } from "../utils/createReservationDetailOverviewEntries";
import ReservationDetailOverviewEntry from "./ReservationDetailOverviewEntry";

const ReservationDetailOverview = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => {
  const entries =
    createReservationDetailOverviewEntries(detail);

  return (
    <Section
      aria-label={copy.RESERVATION}
      className={RESERVATION_DETAIL_OVERVIEW_CLASS}
    >
      {entries.map((entry) => (
        <ReservationDetailOverviewEntry
          {...entry}
          key={entry.label}
        />
      ))}
    </Section>
  );
};

export default ReservationDetailOverview;
