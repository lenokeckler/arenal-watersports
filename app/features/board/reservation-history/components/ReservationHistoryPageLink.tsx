import { Link, Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import type { ReservationHistoryPageLinkProps } from "../models/ReservationHistoryPageLinkProps.interface";
import {
  RESERVATION_HISTORY_DISABLED_PAGE_LINK_CLASS,
  RESERVATION_HISTORY_PAGE_LINK_CLASS,
} from "../styles/ReservationHistoryPagination.styles";

const ReservationHistoryPageLink = ({
  href,
  isEnabled,
  label,
}: ReservationHistoryPageLinkProps): React.JSX.Element =>
  isEnabled ? (
    <Link
      href={href}
      className={RESERVATION_HISTORY_PAGE_LINK_CLASS}
    >
      {label}
    </Link>
  ) : (
    <Text
      role={ARIA_ROLE.LINK}
      aria-disabled
      className={
        RESERVATION_HISTORY_DISABLED_PAGE_LINK_CLASS
      }
    >
      {label}
    </Text>
  );

export default ReservationHistoryPageLink;
