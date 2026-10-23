import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import {
  RESERVATION_DETAIL_CHARGES_COPY as copy,
  RESERVATION_DETAIL_CHARGES_SECTION_ID,
} from "../constants/ReservationDetailChargesCopy.constants";
import { RESERVATION_DETAIL_CHARGE_STATUS } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_CHARGE_STATUS_COPY } from "../constants/ReservationDetailSectionsPresentation.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_EMPTY_CLASS } from "../styles/ReservationDetailSections.styles";
import { resolveReservationDetailChargeBadgeClassName } from "../styles/ReservationDetailCharges.styles";
import ReservationDetailPanel from "./ReservationDetailPanel";
import ReservationDetailChargeRows from "./ReservationDetailChargeRows";
import ReservationDetailOtherAmounts from "./ReservationDetailOtherAmounts";

const ReservationDetailChargesSection = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => (
  <ReservationDetailPanel
    sectionId={RESERVATION_DETAIL_CHARGES_SECTION_ID}
    title={copy.CHARGE_STATUS}
  >
    <InlineText
      className={resolveReservationDetailChargeBadgeClassName(
        detail.chargeStatus
      )}
    >
      {
        RESERVATION_DETAIL_CHARGE_STATUS_COPY[
          detail.chargeStatus
        ]
      }
    </InlineText>
    {detail.chargeStatus ===
    RESERVATION_DETAIL_CHARGE_STATUS.PARENT ? (
      <Text className={RESERVATION_DETAIL_EMPTY_CLASS}>
        {copy.MISSING_PARENT}
      </Text>
    ) : null}
    <ReservationDetailChargeRows charges={detail.charges} />
    <ReservationDetailOtherAmounts detail={detail} />
  </ReservationDetailPanel>
);

export default ReservationDetailChargesSection;
