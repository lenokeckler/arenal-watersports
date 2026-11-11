import { UnorderedList } from "@/app/components";
import { RESERVATION_DETAIL_ZERO_MINOR_UNITS } from "../constants/ReservationDetail.constants";
import type { ReservationDetailChargeRowsProps } from "../models/ReservationDetailChargeRowsProps.interface";
import { RESERVATION_DETAIL_LIST_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailChargeRow from "./ReservationDetailChargeRow";

const ReservationDetailChargeRows = ({
  charges,
}: ReservationDetailChargeRowsProps): React.JSX.Element => (
  <UnorderedList
    className={RESERVATION_DETAIL_LIST_CLASS}
    items={charges
      .filter(
        (charge) =>
          charge.amountTarget !== null ||
          charge.amountChargedGross >
            RESERVATION_DETAIL_ZERO_MINOR_UNITS
      )
      .map((charge) => ({
        id: charge.currency,
        text: (
          <ReservationDetailChargeRow charge={charge} />
        ),
      }))}
  />
);

export default ReservationDetailChargeRows;
