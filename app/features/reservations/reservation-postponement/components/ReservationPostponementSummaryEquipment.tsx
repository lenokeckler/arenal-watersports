import { UnorderedList } from "@/app/components";
import { UNORDERED_LIST } from "@/app/constants";
import type { ReservationPostponementSummaryProps } from "../models/ReservationPostponementSummaryProps.interface";
import { RESERVATION_POSTPONEMENT_EQUIPMENT_LIST_CLASS } from "../styles/ReservationPostponementSummary.styles";
import ReservationPostponementEquipmentRow from "./ReservationPostponementEquipmentRow";

const ReservationPostponementSummaryEquipment = ({
  postponement,
}: ReservationPostponementSummaryProps): React.JSX.Element => (
  <UnorderedList
    variant={UNORDERED_LIST.VARIANTS.PLAIN}
    className={
      RESERVATION_POSTPONEMENT_EQUIPMENT_LIST_CLASS
    }
    items={postponement.equipment.map((line) => ({
      id: line.id,
      text: (
        <ReservationPostponementEquipmentRow line={line} />
      ),
    }))}
  />
);

export default ReservationPostponementSummaryEquipment;
