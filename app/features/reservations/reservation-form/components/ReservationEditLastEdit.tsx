import Text from "@/app/components/text/Text";
import type { ReservationEditLastEditProps } from "../models/ReservationEditLastEditProps.interface";
import { RESERVATION_EDIT_LAST_EDIT_CLASS } from "../styles/ReservationEdit.styles";

const ReservationEditLastEdit = ({
  label,
}: ReservationEditLastEditProps): React.JSX.Element => (
  <Text className={RESERVATION_EDIT_LAST_EDIT_CLASS}>
    {label}
  </Text>
);

export default ReservationEditLastEdit;
