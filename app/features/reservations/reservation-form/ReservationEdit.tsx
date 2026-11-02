import { notFound } from "next/navigation";
import ReservationEditView from "./ReservationEditView";
import type { ReservationEditProps } from "./models/ReservationEditProps.interface";
import { getReservationCategories } from "./services/getReservationCategories";
import { getReservationEdit } from "./services/getReservationEdit";

const ReservationEdit = async ({
  reservationId,
}: ReservationEditProps): Promise<React.JSX.Element> => {
  const reservation =
    await getReservationEdit(reservationId);
  if (!reservation) {
    notFound();
  }
  const categories = await getReservationCategories();

  return (
    <ReservationEditView
      categories={categories}
      reservation={reservation}
    />
  );
};

export default ReservationEdit;
